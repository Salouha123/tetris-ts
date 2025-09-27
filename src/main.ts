import { update } from "./game";

function loop() {
  update();
  requestAnimationFrame(loop);
}

loop();
