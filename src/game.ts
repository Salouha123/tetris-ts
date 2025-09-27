import { Matrix, Position } from "./types";
import { createTetromino } from "./tetromino";
import { drawMatrix, clearScreen } from "./renderer";

const matrix: Matrix = createTetromino("T");
const position: Position = { x: 5, y: 5 };

export function update() {
  clearScreen();
  drawMatrix(matrix, position);
}
