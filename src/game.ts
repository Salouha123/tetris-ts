import { Grid } from "./grid";
import { Piece } from "./piece";
import { Renderer } from "./renderer";
import { PieceKind } from "./constants";

function randKind(): PieceKind {
  const kinds: PieceKind[] = ["I","O","T","S","Z","J","L"];
  return kinds[Math.floor(Math.random() * kinds.length)];
}

export class Game {
  grid: Grid;
  current: Piece | null;
  next: Piece;
  hold: Piece | null;
  canHold: boolean;
  renderer: Renderer;
  score: number;
  lines: number;
  level: number;
  dropInterval: number;
  accumulator: number;
  running: boolean;
  lastTime: number;
  paused: boolean = false;
  private highScore: number;

  constructor(renderer: Renderer) {
    this.grid = new Grid();
    this.renderer = renderer;
    this.current = null;
    this.next = new Piece(randKind());
    this.hold = null;
    this.canHold = true;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.dropInterval = 0.8;
    this.accumulator = 0;
    this.running = false;
    this.lastTime = 0;
    this.paused = false;
    this.highScore = this.loadHighScore();
    this.updateHighScoreDisplay();
  }

  start() {
    this.spawn();
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  spawn() {
    this.current = this.next;
    this.current.row = 0;
    this.current.col = Math.floor((10 - this.current.width()) / 2);
    this.next = new Piece(randKind());
    this.canHold = true;
    if (!this.grid.validPosition(this.current)) {
      // game over
      this.gameOver();
    }
  }

  pause() {
    this.running = !this.running;
    if (this.running) {
      this.lastTime = performance.now();
      requestAnimationFrame(this.loop.bind(this));
    }
  }

  loop(ts: number) {
    if (!this.running) return;
    const dt = (ts - this.lastTime) / 1000;
    this.lastTime = ts;
    this.accumulator += dt;
    if (this.accumulator >= this.dropInterval) {
      this.step();
      this.accumulator = 0;
      if (this.running) {
        requestAnimationFrame(this.loop.bind(this));
        return;
      } 
    }

    // draw
    this.renderer.clear();
    this.renderer.drawGrid(this.grid);
    if (this.current) this.renderer.drawPiece(this.current);
    this.renderer.drawNext(this.next.kind);
    this.renderer.updateHUD(this.score, this.lines, this.level);

    requestAnimationFrame(this.loop.bind(this));
  }

  step() {
    if (!this.current) return;
    this.current.row++;
    if (!this.grid.validPosition(this.current)) {
      this.current.row--;
      this.grid.lockPiece(this.current.getCells(), this.current.kind);
      const cleared = this.grid.clearLines();
      this.applyScore(cleared);
      this.spawn();
    }
  }

  move(dx: number) {
    if (!this.current) return;
    this.current.col += dx;
    if (!this.grid.validPosition(this.current)) this.current.col -= dx;
  }

  rotate() {
    if (!this.current) return;
    const oldRot = this.current.rotation;
    this.current.rotate(1);

    if (!this.grid.validPosition(this.current)) {
      this.current.col -= 1;
      if (!this.grid.validPosition(this.current)) {
        this.current.col += 2;
        if (!this.grid.validPosition(this.current)) {
          this.current.col -= 1;
          this.current.rotation = oldRot;
        }
      }
    }
  }

  hardDrop() {
    if (!this.current) return;
    while (true) {
      this.current.row++;
      if (!this.grid.validPosition(this.current)) {
        this.current.row--;
        this.grid.lockPiece(this.current.getCells(), this.current.kind);
        const cleared = this.grid.clearLines();
        this.applyScore(cleared);
        this.spawn();
        break;
      }
    }
  }

  holdPiece() {
    if (!this.current || !this.canHold) return;
    if (!this.hold) {
      this.hold = new Piece(this.current.kind);
      this.spawn();
    } else {
      const tmp = this.hold;
      this.hold = new Piece(this.current.kind);
      this.current = new Piece(tmp.kind);
      this.current.row = 0;
      this.current.col = Math.floor((10 - this.current.width()) / 2);
      if (!this.grid.validPosition(this.current)) {
        this.gameOver();
      }
    }
    this.canHold = false;
  }

  applyScore(cleared: number) {
    if (cleared <= 0) return;
    const points = [0, 100, 300, 500, 800];
    this.score += points[cleared] ?? cleared * 200;
    this.lines += cleared;
    this.level = 1 + Math.floor(this.lines / 10);
    this.dropInterval = Math.max(0.05, 0.8 - (this.level - 1) * 0.05);
    
    // Vérifier et mettre à jour le high score
    this.checkAndUpdateHighScore();
  }

  restart() {
    this.grid = new Grid();
    this.current = null;
    this.next = new Piece(randKind());
    this.hold = null;
    this.canHold = true;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.dropInterval = 0.8;
    this.accumulator = 0;
    this.running = false;
    this.start();
  }

  private loadHighScore(): number {
    const saved = localStorage.getItem('tetris-highscore');
    return saved ? parseInt(saved, 10) : 0;
  }

  private saveHighScore(): void {
    localStorage.setItem('tetris-highscore', this.highScore.toString());
  }

  private updateHighScoreDisplay(): void {
    const highscoreEl = document.getElementById('highscore');
    if (highscoreEl) {
      highscoreEl.textContent = `Best: ${this.highScore}`;
    }
  }

  private checkAndUpdateHighScore(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
      this.updateHighScoreDisplay();
      
      // Animation quand on bat le record
      const highscoreEl = document.getElementById('highscore');
      if (highscoreEl) {
        highscoreEl.style.animation = 'none';
        setTimeout(() => {
          highscoreEl.style.animation = 'pulse 0.5s ease';
        }, 10);
      }
    }
  }

  public gameOver(): void {
    this.running = false;
    this.checkAndUpdateHighScore();
    alert("Game Over! Score: " + this.score);
  }
}