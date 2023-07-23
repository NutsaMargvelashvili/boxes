"use strict";

import gameView from "./gameView.js";

class Box extends gameView {
  addBtn = document.querySelector(".add");
  #boxCount = document.querySelector(".box__count");
  board = document.querySelector(".board");

  constructor() {
    super();
    this.#setUpBox();
    this.#findSpace();
  }

  #setUpBox() {
    this.height = this.#generateRand(50, 251);
    this.width = this.#generateRand(50, 251);
    this.positionX1 = this.#generateRand(
      0,
      parseInt(this.board.style.width) - this.width
    );
    this.positionX2 = this.positionX1 + this.width;
    this.positionY1 = this.#generateRand(
      0,
      parseInt(this.board.style.height) - this.height
    );
    this.positionY2 = this.positionY1 + this.height;
  }

  #generateRand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  #findSpace() {
    this.addBtn.disabled = true;
    const startTime = Date.now();
    while (true) {
      if (
        !this.checkOverlay(
          this.positionX1,
          this.positionX2,
          this.positionY1,
          this.positionY2
        )
      ) {
        this.generateMarkup();
        // Increase box counter
        this.#boxCount.innerText = +this.#boxCount.innerText + 1;
        // Overlay condition is met!
        break;
      }
      this.#setUpBox();

      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      // Exit from the loop if space is not found for 10 sec
      if (elapsedTime >= 10000) {
        alert("No Space was found.");
        break;
      }
    }
    this.addBtn.disabled = false;
  }

  generateMarkup() {
    const markup = `<div class="box fade" style="width: ${this.width}; height: ${this.height}; left: ${this.positionX1}px; top: ${this.positionY1}px"></div>`;
    this.board.insertAdjacentHTML("afterbegin", markup);
  }
}

export default Box;
