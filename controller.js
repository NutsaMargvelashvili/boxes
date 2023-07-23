import Board from "./boardView.js";
import Box from "./boxView.js";

const controlAdd = () => {
  new Box();
};

const init = () => {
  const board = new Board();
  board.addHandlerAdd(controlAdd);
};

init();
