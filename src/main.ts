import "./style.css";
import { Renderer } from "./renderer";
import { Game } from "./game";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

const canvas = document.getElementById("game") as HTMLCanvasElement;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const renderer = new Renderer(canvas);
const game = new Game(renderer);

window.addEventListener("keydown", (e) => {
  if (!game) return;
  switch (e.key) {
    case "r":
    case "R":
      game.restart();
      break;    
    case "p":
    case "P":
      game.pause();
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      game.move(-1);
      break;
    case "ArrowRight":
    case "d":
    case "D":
    game.move(1);
      break;
    case "ArrowUp":
    case "w":
    case "W":
    game.rotate();
      break;
    case "ArrowDown":
    case "s":
    case "S":
    game.step();
      break;
    case " ":
      e.preventDefault();
      game.hardDrop();
      break;
    case "c":
    case "C":
      game.holdPiece();
      break;
  }
});

document.getElementById("restart")?.addEventListener("click", () => {
  game.restart();
});

// start when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  game.start();
});
