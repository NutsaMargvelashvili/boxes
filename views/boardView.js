"use strict";

import gameView from "./gameView.js";

class BoardView extends gameView {
  parentEl = document.querySelector(".game__wrapper");
  board;
  boardSize = document.querySelector(".board__size__px");
  addBtn = document.querySelector(".add");
  addClear = document.querySelector(".clear");
  boxCount = document.querySelector(".box__count");
  step = +document.querySelector(".box__speed").value;
  selectedBox;

  constructor(height = 1000, width = 1000) {
    super();
    this.height = height;
    this.width = width;
    this.boxCount.innerText = 0;
    this.generateMarkup();
    this.#changeSpeed();
    this.addHandlerClear();
  }

  #changeSpeed() {
    document.querySelector(".box__speed").addEventListener("change", () => {
      this.step = +document.querySelector(".box__speed").value;
    });
  }

  generateMarkup() {
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

  #move(e) {
    const borders = this.board.getBoundingClientRect();
    const boxLeft = parseInt(this.selectedBox.style.left);
    const boxRight = boxLeft + parseInt(this.selectedBox.style.width);
    const boxTop = parseInt(this.selectedBox.style.top);
    const boxBottom = boxTop + parseInt(this.selectedBox.style.height);

    if (
      e.key === "ArrowLeft" &&
      // Simplified
      // parseInt(this.selectedBox.style.left) + borders.left - this.step >= borders.left
      boxLeft >= this.step &&
      !this.checkOverlay(
        boxLeft - this.step,
        boxRight - this.step,
        boxTop,
        boxBottom
      )
    )
      this.selectedBox.style.left = `${
        parseInt(this.selectedBox.style.left) - this.step
      }px`;
    if (
      e.key === "ArrowRight" &&
      // Simplified
      // boxRight + borders.left + this.step <= borders.right
      boxRight + this.step <= borders.width &&
      !this.checkOverlay(
        boxLeft + this.step,
        boxRight + this.step,
        boxTop,
        boxBottom
      )
    )
      this.selectedBox.style.left = `${
        parseInt(this.selectedBox.style.left) + this.step
      }px`;
    if (
      e.key === "ArrowDown" &&
      boxBottom + this.step <= borders.height &&
      !this.checkOverlay(
        boxLeft,
        boxRight,
        boxTop + this.step,
        boxBottom + this.step
      )
    )
      this.selectedBox.style.top = `${
        parseInt(this.selectedBox.style.top) + this.step
      }px`;
    if (
      e.key === "ArrowUp" &&
      boxTop >= this.step &&
      !this.checkOverlay(
        boxLeft,
        boxRight,
        boxTop - this.step,
        boxBottom - this.step
      )
    )
      this.selectedBox.style.top = `${
        parseInt(this.selectedBox.style.top) - this.step
      }px`;
  }

  addHandlerClicked() {
    this.parentEl.addEventListener("click", (e) => {
      if (this.selectedBox) {
        console.log(this.selectedBox);
        // Removing previous event listener
        this.selectedBox.style.background = "yellow";
        this.selectedBox.classList.add("fade");
        this.selectedBox = "";
      }
      if (!e.target.classList.contains("box")) return;
      this.selectedBox = e.target;
      this.selectedBox.style.background = "red";
      this.selectedBox.classList.remove("fade");
      window.addEventListener("keydown", this.#move.bind(this));
    });
  }

  addHandlerClear() {
    this.addClear.addEventListener("click", this.#clear.bind(this));
  }
}

export default BoardView;
