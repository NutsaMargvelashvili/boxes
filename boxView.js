"use strict";

class Box {
  parentEl = document.querySelector(".board");
  addBtn = document.querySelector(".add");
  #boxCount = document.querySelector(".box__count");

  #height;
  #width;
  #positionX1;
  #positionX2;
  #positionY1;
  #positionY2;

  constructor() {
    this.#setUpBox();
    this.#findSpace();
  }

  #setUpBox() {
    this.#height = this.#generateRand(50, 251);
    this.#width = this.#generateRand(50, 251);
    this.#positionX1 = this.#generateRand(
      0,
      parseInt(this.parentEl.style.width) - this.#width
    );
    this.#positionX2 = this.#positionX1 + this.#width;
    this.#positionY1 = this.#generateRand(
      0,
      parseInt(this.parentEl.style.height) - this.#height
    );
    this.#positionY2 = this.#positionY1 + this.#height;
  }

  #generateRand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  #checkHorizontalOverlay(boxLeft, boxRight) {
    // Checking horizontal overlay
    return (
      // When current box is overlaying the left part of the box
      (this.#positionX2 >= boxLeft && this.#positionX1 <= boxLeft) ||
      // When current box is inside the box
      (this.#positionX2 <= boxRight && this.#positionX1 >= boxLeft) ||
      // when current box is covering all the box (is bigger)
      (this.#positionX2 >= boxRight && this.#positionX1 <= boxLeft) ||
      // When current box is overlaying the right part of the box
      (this.#positionX2 >= boxRight && this.#positionX1 <= boxRight)
    );
  }

  #checkVerticalOverlay(boxTop, boxBottom) {
    // Checking vertical overlay
    return (
      // When current box is overlaying the top part of the box
      (this.#positionY2 >= boxTop && this.#positionY1 <= boxTop) ||
      // When current box is inside the box
      (this.#positionY2 <= boxBottom && this.#positionY1 >= boxTop) ||
      // when current box is covering all the box (is bigger)
      (this.#positionY2 >= boxBottom && this.#positionY1 <= boxTop) ||
      // When current box is overlaying the bottom part of the box
      (this.#positionY2 >= boxBottom && this.#positionY1 <= boxBottom)
    );
  }

  #checkOverlay() {
    const boardCoords = this.parentEl.getBoundingClientRect();
    const boxes = this.parentEl.childNodes;

    // Using for of loop because I want to break from the loop when boxes overlap
    for (const box of boxes) {
      // Getting box coordinates
      const boxCoords = box.getBoundingClientRect();
      const boxLeft = boxCoords.left + window.scrollX - boardCoords.left;
      const boxRight = boxLeft + boxCoords.width;
      const boxTop = boxCoords.top - boardCoords.top;
      const boxBottom = boxTop + boxCoords.height;

      // This will not check vertical Overlay if there is no horizontal overlay
      if (!this.#checkHorizontalOverlay(boxLeft, boxRight)) continue;
      if (this.#checkVerticalOverlay(boxTop, boxBottom)) return true;
    }

    return false;
  }

  #findSpace() {
    this.addBtn.disabled = true;
    const startTime = Date.now();
    while (true) {
      if (!this.#checkOverlay()) {
        this.#generateMarkup();
        // Increase box counter
        this.#boxCount.innerText = +this.#boxCount.innerText + 1;
        console.log("Overlay condition is met!");
        break;
      }
      this.#setUpBox();

      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= 10000) {
        alert("No Space was found.");
        break;
      }
    }
    this.addBtn.disabled = false;
  }

  #generateMarkup() {
    const markup = `<div class="box" style="width: ${this.#width}; height: ${
      this.#height
    }; left: ${this.#positionX1}px; top: ${this.#positionY1}px"></div>`;
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default Box;
