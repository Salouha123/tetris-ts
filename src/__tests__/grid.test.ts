import { describe, it, expect } from "vitest";
import { Grid } from "../grid";

describe("Grid", () => {
  it("clears full lines", () => {
    const g = new Grid();
    // fill bottom row
    const gridRef = g.getGrid();
    for (let c = 0; c < 10; c++) gridRef[19][c] = "X";
    const cleared = g.clearLines();
    expect(cleared).toBe(1);
  });
});
