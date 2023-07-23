import Board from "./views/boardView.js";
import Box from "./views/boxView.js";

const controlAdd = () => {
  new Box();
};

const init = () => {
  const board = new Board();
  board.addHandlerAdd(controlAdd);
  board.addHandlerClicked();
};

init();
