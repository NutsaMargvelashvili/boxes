"use strict";

class Board {
  parentEl = document.querySelector(".game__wrapper");
  board;
  boardSize = document.querySelector(".board__size__px");
  addBtn = document.querySelector(".add");
  addClear = document.querySelector(".clear");
  boxCount = document.querySelector(".box__count");

  constructor(height = 1000, width = 1000) {
    this.height = height;
    this.width = width;
    this.boxCount.innerText = 0;
    this.#generateMarkup();
    this.addHandlerClear();
  }

  #generateMarkup() {
    const markup = `<div class="board" style="width: ${this.width}; height: ${this.height}"></div>`;
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
    this.boardSize.innerText = `${parseInt(this.width)}x${parseInt(
      this.height
    )}`;
    this.board = document.querySelector(".board");
  }

  addHandlerAdd(handler) {
    this.addBtn.addEventListener("click", handler);
  }

  #clear() {
    this.board.innerHTML = "";
    this.boxCount.innerText = 0;
  }

  addHandlerClear() {
    this.addClear.addEventListener("click", this.#clear.bind(this));
  }
}

export default Board;
