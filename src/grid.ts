import { ROWS, COLS } from "./constants";
import { Piece } from "./piece";

export class Grid {
  private grid: (string | null)[][];

  constructor() {
    this.grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => null)
    );
  }

  getGrid() {
    // retournons une référence pour les tests / renderer
    return this.grid;
  }

  inside(r: number, c: number) {
    return r >= 0 && r < ROWS && c >= 0 && c < COLS;
  }

  validPosition(piece: Piece) {
    for (const [r, c] of piece.getCells()) {
      if (!this.inside(r, c)) return false;
      if (this.grid[r][c] !== null) return false;
    }
    return true;
  }

  lockPiece(cells: [number, number][], kind: string) {
    for (const [r, c] of cells) {
      if (this.inside(r, c)) this.grid[r][c] = kind;
    }
  }

  clearLines() {
    const newGrid = this.grid.filter(row => row.some(cell => cell === null));
    const cleared = ROWS - newGrid.length;
    while (newGrid.length < ROWS) {
      newGrid.unshift(Array.from({ length: COLS }, () => null));
    }
    this.grid = newGrid;
    return cleared;
  }

  isGameOver() {
    // si une case de la première ligne est remplie, c'est fini
    return this.grid[0].some(cell => cell !== null);
  }
}
