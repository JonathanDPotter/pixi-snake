import { Coords } from "../index";
import Snake from "./snake";
import { randomGridPosition } from "../utils/grid";

export default class Food {
  position: null | Coords;
  expansionRate: number;

  constructor() {
    this.position = null;
    this.expansionRate = 2;
  }

  update(snake: Snake, scoreOne: { (): void; (): void; }) {
    if (this.position === null) this.position = this.getRandomPosition(snake);

    if (this.position && snake.onSnake(this.position)) {
      snake.expandSnake(this.expansionRate);
      this.position = this.getRandomPosition(snake);
      scoreOne();
    }
  }

  getRandomPosition(snake: Snake): Coords {
    let newFoodPosition: Coords | null = null;

    while (newFoodPosition === null || snake.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }
}
