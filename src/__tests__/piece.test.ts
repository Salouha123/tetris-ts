import { describe, it, expect } from "vitest";
import { Piece } from "../piece";

describe("Piece", () => {
  it("rotates and returns valid cell counts", () => {
    const p = new Piece("T");
    const before = p.getCells().length;
    p.rotate();
    const after = p.getCells().length;
    expect(after).toBe(before);
  });
});
