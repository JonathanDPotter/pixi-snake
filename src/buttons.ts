import { setGameState, GameState } from "./index";
import Snake from "./objects/snake";

const Buttons = (snake: Snake) => {
  const div = document.createElement("div");
  div.id = "buttons";
  div.className = "buttons";

  const makeButton = (text: string, speed: number) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.innerText = text;
    button.addEventListener("click", () => {
      snake.speed = speed;
      setGameState(GameState.running);
    });

    div.appendChild(button);
  };

  makeButton("easy", 16);
  makeButton("normal", 8);
  makeButton("hard", 4);

  return div;
};

export default Buttons;
