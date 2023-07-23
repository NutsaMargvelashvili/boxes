"use strict";

class gameView {
  board;
  selectedBox;

  #checkHorizontalOverlay(boxLeft, boxRight, positionX1, positionX2) {
    // Checking horizontal overlay
    return (
      // When current box is overlaying the left part of the box
      (positionX2 >= boxLeft && positionX1 <= boxLeft) ||
      // When current box is inside the box
      (positionX2 <= boxRight && positionX1 >= boxLeft) ||
      // when current box is covering all the box (is bigger)
      (positionX2 >= boxRight && positionX1 <= boxLeft) ||
      // When current box is overlaying the right part of the box
      (positionX2 >= boxRight && positionX1 <= boxRight)
    );
  }

  #checkVerticalOverlay(boxTop, boxBottom, positionY1, positionY2) {
    // Checking vertical overlay
    return (
      // When current box is overlaying the top part of the box
      (positionY2 >= boxTop && positionY1 <= boxTop) ||
      // When current box is inside the box
      (positionY2 <= boxBottom && positionY1 >= boxTop) ||
      // when current box is covering all the box (is bigger)
      (positionY2 >= boxBottom && positionY1 <= boxTop) ||
      // When current box is overlaying the bottom part of the box
      (positionY2 >= boxBottom && positionY1 <= boxBottom)
    );
  }

  checkOverlay(x1, x2, y1, y2) {
    const boardCoords = this.board.getBoundingClientRect();
    const boxes = this.board.childNodes;

    // Using for of loop because I want to break from the loop when boxes overlap
    for (const box of boxes) {
      if (box === this.selectedBox) continue;
      // Getting box coordinates
      const boxCoords = box.getBoundingClientRect();
      const boxLeft = boxCoords.left + window.scrollX - boardCoords.left;
      const boxRight = boxLeft + boxCoords.width;
      const boxTop = boxCoords.top - boardCoords.top;
      const boxBottom = boxTop + boxCoords.height;

      // This will not check vertical Overlay if there is no horizontal overlay
      if (!this.#checkHorizontalOverlay(boxLeft, boxRight, x1, x2)) continue;
      if (this.#checkVerticalOverlay(boxTop, boxBottom, y1, y2)) return true;
    }

    return false;
  }
}

export default gameView;
