import * as PIXI from "pixi.js";
import colors from "./utils/colors";
import "./styles.scss";
import Snake from "./objects/snake";
import Food from "./objects/food";
import { GRID_SIZE, outsideGrid } from "./utils/grid";
import drawMenu from "./utils/drawMenu";
import drawGame from "./utils/drawGame";
import drawGameOver from "./utils/drawGameOver";
import Buttons from "./Buttons";

export interface Coords {
  y: number;
  x: number;
}

export enum GameState {
  menu = "menu",
  running = "running",
  dead = "dead",
}

const size =
  window.innerHeight < window.innerWidth
    ? window.innerHeight
    : window.innerWidth;

const squareSize = size / GRID_SIZE;

const app = new PIXI.Application({
  height: size,
  width: size,
  background: colors.umber,
});

let score = 0;
let topScore = 0;
let gameState = GameState.menu;

const snake = new Snake();
const food = new Food();

const scoreOne = () => {
  score += 1;
};

export const setGameState = (newState: GameState) => {
  gameState = newState;
  const buttons = document.getElementById("buttons")!;
  gameState === GameState.dead ||
    (GameState.running && buttons.classList.add("hidden"));
  gameState === GameState.menu && buttons.classList.remove("hidden");
};

export const handleSpace = () => {
  if (gameState === GameState.dead) setGameState(GameState.menu);
};

const draw = () => {
  app.stage.removeChildren();

  const scoreDisplay = new PIXI.Text(`score: ${score}`, { fill: colors.white });
  scoreDisplay.anchor.x = 0.5;
  scoreDisplay.position.x = size / 3;

  const topScoreDisplay = new PIXI.Text(`top score: ${topScore}`, {
    fill: colors.white,
  });
  topScoreDisplay.anchor.x = 0.5;
  topScoreDisplay.position.x = size / 1.5;

  const container = new PIXI.Container();
  container.position.y = 30;

  container.addChild(scoreDisplay, topScoreDisplay);

  app.stage.addChild(container);

  switch (gameState) {
    case GameState.menu:
      drawMenu(app, size);

      break;

    case GameState.running:
      drawGame(app, snake, food, squareSize);

      break;

    case GameState.dead:
      drawGameOver(app, size);

    default:
      break;
  }
};

const checkDeath = () => {
  if (outsideGrid(snake.getSnakeHead()) || snake.snakeIntersection()) {
    snake.reset();
    score > topScore && (topScore = score);
    score = 0;
    gameState = GameState.dead;
  }
};

let elapsedTime = 0;

app.ticker.add((delta) => {
  elapsedTime += delta;

  if (elapsedTime >= snake.speed) {
    snake.update();
    food.update(snake, scoreOne);
    checkDeath();
    draw();
    elapsedTime = 0;
  }
});

document.body.appendChild(Buttons(snake));

document.body.appendChild(app.view as unknown as Node);
