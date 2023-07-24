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

  constructor(height = 1000, width = 1000) {
    super(height, width);
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

  #calcAvailableStep(space, step) {
    // If there is no space left because of the high step, step will be equal to the space left

    return Math.trunc(space / step) ? step : space % step;
  }

  #move(e) {
    const borders = this.board.getBoundingClientRect();
    const boxLeft = parseInt(this.selectedBox.style.left);
    const boxRight = boxLeft + parseInt(this.selectedBox.style.width);
    const boxTop = parseInt(this.selectedBox.style.top);
    const boxBottom = boxTop + parseInt(this.selectedBox.style.height);

    if (e.key === "ArrowLeft") {
      const step = this.#calcAvailableStep(boxLeft, this.step);
      if (
        // Simplified
        // parseInt(this.selectedBox.style.left) + borders.left - this.step >= borders.left
        boxLeft >= step &&
        !this.checkOverlay(boxLeft - step, boxRight - step, boxTop, boxBottom)
      ) {
        this.selectedBox.style.left = `${
          parseInt(this.selectedBox.style.left) - step
        }px`;
        this.checkSpecialOrder();
      }
    }
    if (e.key === "ArrowRight") {
      const step = this.#calcAvailableStep(this.width - boxRight, this.step);
      if (
        // Simplified
        // boxRight + borders.left + this.step <= borders.right
        boxRight + step <= borders.width &&
        !this.checkOverlay(boxLeft + step, boxRight + step, boxTop, boxBottom)
      ) {
        this.selectedBox.style.left = `${
          parseInt(this.selectedBox.style.left) + step
        }px`;
        this.checkSpecialOrder();
      }
    }
    if (e.key === "ArrowDown") {
      const step = this.#calcAvailableStep(this.height - boxBottom, this.step);
      if (
        boxBottom + step <= borders.height &&
        !this.checkOverlay(boxLeft, boxRight, boxTop + step, boxBottom + step)
      ) {
        this.selectedBox.style.top = `${
          parseInt(this.selectedBox.style.top) + step
        }px`;
        this.checkSpecialOrder();
      }
    }
    if (e.key === "ArrowUp") {
      const step = this.#calcAvailableStep(boxTop, this.step);

      if (
        boxTop >= step &&
        !this.checkOverlay(boxLeft, boxRight, boxTop - step, boxBottom - step)
      ) {
        this.selectedBox.style.top = `${
          parseInt(this.selectedBox.style.top) - step
        }px`;
        this.checkSpecialOrder();
      }
    }
  }

  #handleBoxClick(e) {
    const moveBox = this.#move.bind(this);

    // If click wasn't on the box
    if (!e.target.classList.contains("box")) return;

    // If box was already clicked previously
    if (this.selectedBox) {
      this.selectedBox.style.background = "yellow";
      this.selectedBox.classList.add("fade");
      this.selectedBox = e.target;
      this.selectedBox.style.background = "red";
      this.selectedBox.classList.remove("fade");
    }

    // If this is the first click
    if (!this.selectedBox) {
      this.selectedBox = e.target;
      this.selectedBox.style.background = "red";
      this.selectedBox.classList.remove("fade");
      window.addEventListener("keydown", moveBox);
    }
  }

  addHandlerClicked() {
    this.parentEl.addEventListener("click", this.#handleBoxClick.bind(this));
  }

  addHandlerClear() {
    this.addClear.addEventListener("click", this.#clear.bind(this));
  }
}

export default BoardView;
