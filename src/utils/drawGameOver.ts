import * as PIXI from "pixi.js";
import colors from "./colors";

const drawGameOver = (app: PIXI.Application, size: number) => {
  const container = new PIXI.Container();
  container.height = size;
  container.width = size;

  const gameOver = new PIXI.Text("Game Over", {
    fontSize: size / 6,
    fill: colors.white,
    align: "center",
  });

  gameOver.anchor.x = 0.5;
  gameOver.anchor.y = 0.5;

  gameOver.position = { x: size / 2, y: size / 2 };

  const message = new PIXI.Text("press space to restart", {
    fontSize: size / 15,
    fill: colors.drab,
    align: "center",
  });

  message.anchor.x = 0.5;
  message.anchor.y = 0.5;

  message.position = { x: size / 2, y: size / 1.5 };

  container.addChild(gameOver, message);
  app.stage.addChild(container);
};

export default drawGameOver;
