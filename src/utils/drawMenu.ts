import * as PIXI from "pixi.js";
import colors from "./colors";

const drawMenu = (app: PIXI.Application, size: number) => {
  const title = new PIXI.Text("Snake Game", {
    fill: colors.drab,
    fontSize: size / 6,
    fontFamily: "monospace",
    align: "center",
  });

  title.width = size / 1.5;
  title.position.x = size / 6;
  title.position.y = size / 3;

  app.stage.addChild(title);
};

export default drawMenu;
