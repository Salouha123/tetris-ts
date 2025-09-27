import { describe, it, expect } from "vitest";
import { Grid } from "../grid";
import { Piece } from "../piece";

describe("Grid", () => {
  it("clears full lines", () => {
    const g = new Grid();
    const gridRef = g.getGrid();
    for (let c = 0; c < 10; c++) gridRef[19][c] = "X";
    const cleared = g.clearLines();
    expect(cleared).toBe(1);
  });

  it("clears multiple lines", () => {
    const g = new Grid();
    const gridRef = g.getGrid();
    // Fill two complete rows
    for (let c = 0; c < 10; c++) {
      gridRef[18][c] = "X";
      gridRef[19][c] = "Y";
    }
    const cleared = g.clearLines();
    expect(cleared).toBe(2);
  });

  it("detects valid position", () => {
    const g = new Grid();
    const piece = new Piece("I");
    piece.row = 0;
    piece.col = 3;
    expect(g.validPosition(piece)).toBe(true);
  });

  it("detects invalid position (out of bounds)", () => {
    const g = new Grid();
    const piece = new Piece("I");
    piece.row = 0;
    piece.col = -1;
    expect(g.validPosition(piece)).toBe(false);
  });

  it("detects game over", () => {
    const g = new Grid();
    const gridRef = g.getGrid();
    gridRef[0][5] = "X"; // Block in top row
    expect(g.isGameOver()).toBe(true);
  });
});