import { describe, it, expect } from "vitest";
import { Piece } from "../piece";

describe("Piece", () => {
  it("rotates correctly", () => {
    const piece = new Piece("T");
    const initialRotation = piece.rotation;
    piece.rotate();
    expect(piece.rotation).toBe((initialRotation + 1) % 4);
  });

  it("returns correct cells", () => {
    const piece = new Piece("O");
    piece.row = 0;
    piece.col = 0;
    const cells = piece.getCells();
    expect(cells).toEqual([[0,0], [0,1], [1,0], [1,1]]);
  });
});