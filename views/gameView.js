"use strict";

class gameView {
  board;
  selectedBox;
  step = +document.querySelector(".box__speed").value;
  availableStep = this.step;

  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  #checkHorizontalOverlay(boxLeft, boxRight, positionX1, positionX2) {
    // Checking horizontal overlay
    return (
      // When current box is overlaying the left part of the box
      (positionX2 > boxLeft && positionX1 < boxLeft) ||
      // When current box is inside the box
      (positionX2 <= boxRight && positionX1 >= boxLeft) ||
      // when current box is covering all the box (is bigger)
      (positionX2 > boxRight && positionX1 < boxLeft) ||
      // When current box is overlaying the right part of the box
      (positionX2 > boxRight && positionX1 < boxRight)
    );
  }

  #checkVerticalOverlay(boxTop, boxBottom, positionY1, positionY2) {
    // Checking vertical overlay
    return (
      // When current box is overlaying the top part of the box
      (positionY2 > boxTop && positionY1 < boxTop) ||
      // When current box is inside the box
      (positionY2 <= boxBottom && positionY1 >= boxTop) ||
      // when current box is covering all the box (is bigger)
      (positionY2 > boxBottom && positionY1 < boxTop) ||
      // When current box is overlaying the bottom part of the box
      (positionY2 > boxBottom && positionY1 < boxBottom)
    );
  }

  checkOverlay(x1, x2, y1, y2, direction) {
    const boxes = this.board.childNodes;

    let boxCoords;
    // Using for of loop because I want to break from the loop when boxes overlap
    for (const box of boxes) {
      if (box === this.selectedBox) continue;
      // Getting box coordinates
      boxCoords = this.#getCoords(box);
      // This will not check vertical Overlay if there is no horizontal overlay
      if (
        !this.#checkHorizontalOverlay(boxCoords.left, boxCoords.right, x1, x2)
      )
        continue;
      if (this.#checkVerticalOverlay(boxCoords.top, boxCoords.bottom, y1, y2)) {
        if (direction === "ArrowLeft") {
          this.availableStep = x1 + this.availableStep - boxCoords.right;
          return false;
        }
        if (direction === "ArrowRight") {
          this.availableStep = boxCoords.left - x2 + this.availableStep;
          return false;
        }
        if (direction === "ArrowUp") {
          this.availableStep = y1 + this.availableStep - boxCoords.bottom;
          return false;
        }
        if (direction === "ArrowDown") {
          this.availableStep = boxCoords.top - y2 + this.availableStep;
          return false;
        }
        return true;
      }
    }

    return false;
  }

  calcAvailableStep(space, step) {
    // If there is no space left because of the high step, step will be equal to the space left
    return Math.trunc(space / step) ? step : space % step;
  }

  #checkOnTheEdge(box) {
    return (
      box.left === 0 ||
      box.right === this.width ||
      box.top === 0 ||
      box.bottom === this.height
    );
  }

  #getCoords(box) {
    const boardCoords = this.board.getBoundingClientRect();
    // Getting box coordinates
    const boxCoords = box.getBoundingClientRect();
    const left = boxCoords.left + window.scrollX - boardCoords.left;
    const right = left + boxCoords.width;
    const top = boxCoords.top - boardCoords.top;
    const bottom = top + boxCoords.height;
    return { left, right, top, bottom };
  }

  #setSpecialOrder() {
    const boxes = this.board.childNodes;
    boxes.forEach((box) => box.classList.add("special"));
  }

  #removeSpecialOrder() {
    const boxes = this.board.childNodes;
    boxes.forEach((box) => box.classList.remove("special"));
  }

  checkSpecialOrder() {
    // Checking if every box are lined up vertically
    const boxes = this.board.childNodes;
    if (boxes.length <= 1) return;
    let alignedVertically = true;
    let alignedHorizontally = true;
    let alignedOnEdges = true;
    let specialOrder = true;

    for (const box of boxes) {
      // Getting first box coordinates
      const box1 = this.#getCoords(box);
      if (!this.#checkOnTheEdge(box1)) alignedOnEdges = false;

      for (const boxCompared of boxes) {
        // Not compare to itself
        if (box === boxCompared) continue;
        // Getting second box coordinates
        const box2 = this.#getCoords(boxCompared);

        if (
          !this.#checkVerticalOverlay(
            box1.top,
            box1.bottom,
            box2.top,
            box2.bottom
          )
        )
          alignedVertically = false;
        if (
          !this.#checkHorizontalOverlay(
            box1.left,
            box1.right,
            box2.left,
            box2.right
          )
        )
          alignedHorizontally = false;
        if (!alignedVertically && !alignedHorizontally && !alignedOnEdges) {
          specialOrder = false;
          break;
        }
      }
    }
    if (specialOrder) this.#setSpecialOrder();
    else this.#removeSpecialOrder();
  }
}

export default gameView;
