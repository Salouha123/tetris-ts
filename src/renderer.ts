import { CELL, ROWS, COLS } from "./constants";
import { Grid } from "./grid";
import { Piece } from "./piece";

const COLORS: Record<string, string> = {
  I: "#5eead4",
  O: "#fef08a",
  T: "#c084fc",
  S: "#86efac",
  Z: "#fb7185",
  J: "#93c5fd",
  L: "#ffb86b"
};

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");
    this.ctx = ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGrid(grid: Grid) {
    const g = grid.getGrid();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const val = g[r][c];
        if (val) this.drawCell(r, c, COLORS[val]);
        else this.drawEmpty(r, c);
      }
    }
  }

  drawPiece(piece: Piece) {
    for (const [r, c] of piece.getCells()) {
      if (r < 0) continue; // partie au dessus
      this.drawCell(r, c, COLORS[piece.kind]);
    }
  }

  drawCell(r: number, c: number, color: string) {
    const x = c * CELL;
    const y = r * CELL;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, CELL - 1, CELL - 1);
    this.ctx.strokeStyle = "#0b1220";
    this.ctx.strokeRect(x, y, CELL - 1, CELL - 1);
  }

  drawEmpty(r: number, c: number) {
    const x = c * CELL;
    const y = r * CELL;
    this.ctx.fillStyle = "#071027";
    this.ctx.fillRect(x, y, CELL - 1, CELL - 1);
    this.ctx.strokeStyle = "#0b1220";
    this.ctx.strokeRect(x, y, CELL - 1, CELL - 1);
  }

  updateHUD(score: number, lines: number, level: number) {
    const elScore = document.getElementById("score");
    if (elScore) elScore.textContent = `Score: ${score} — Lines: ${lines} — Level: ${level}`;
  }

  // small next preview rendering inside #next element
  drawNext(kind: string) {
    const el = document.getElementById("next");
    if (!el) return;
    el.innerHTML = `<div style="font-size:14px">Next: ${kind}</div>`;
  }
}
