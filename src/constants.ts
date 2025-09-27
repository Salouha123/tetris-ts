export const ROWS = 20;
export const COLS = 10;
export const CELL = 30; // pixels
export const CANVAS_WIDTH = COLS * CELL;
export const CANVAS_HEIGHT = ROWS * CELL;

export type PieceKind = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export type Matrix = number[][];
export type Cell = [number, number];
