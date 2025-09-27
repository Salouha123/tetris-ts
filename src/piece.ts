import { Matrix, PieceKind, Cell } from "./constants";

/**
 * Each shape is a list of rotation matrices (0..n-1)
 * Matrices are small arrays of 0/1 values.
 */
export const SHAPES: Record<PieceKind, Matrix[]> = {
  I: [
    [[1,1,1,1]],
    [[1],[1],[1],[1]]
  ],
  O: [
    [[1,1],[1,1]]
  ],
  T: [
    [[0,1,0],[1,1,1]],
    [[1,0],[1,1],[1,0]],
    [[1,1,1],[0,1,0]],
    [[0,1],[1,1],[0,1]]
  ],
  S: [
    [[0,1,1],[1,1,0]],
    [[1,0],[1,1],[0,1]]
  ],
  Z: [
    [[1,1,0],[0,1,1]],
    [[0,1],[1,1],[1,0]]
  ],
  J: [
    [[1,0,0],[1,1,1]],
    [[1,1],[1,0],[1,0]],
    [[1,1,1],[0,0,1]],
    [[0,1],[0,1],[1,1]]
  ],
  L: [
    [[0,0,1],[1,1,1]],
    [[1,0],[1,0],[1,1]],
    [[1,1,1],[1,0,0]],
    [[1,1],[0,1],[0,1]]
  ]
};

export class Piece {
  kind: PieceKind;
  rotation: number;
  row: number;
  col: number;

  constructor(kind: PieceKind) {
    this.kind = kind;
    this.rotation = 0;
    this.row = 0;
    // center horizontally (col will be adjusted on spawn)
    this.col = 3;
  }

  matrix() {
    return SHAPES[this.kind][this.rotation];
  }

  width() {
    return this.matrix()[0].length;
  }

  height() {
    return this.matrix().length;
  }

  getCells(): Cell[] {
    const m = this.matrix();
    const cells: Cell[] = [];
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[r].length; c++) {
        if (m[r][c]) cells.push([this.row + r, this.col + c]);
      }
    }
    return cells;
  }

  rotate(dir = 1) {
    const n = SHAPES[this.kind].length;
    this.rotation = (this.rotation + dir + n) % n;
  }
}
