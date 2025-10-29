import { View } from "./scripts/view";
import { Model } from "./scripts/model";

const Controller = {
  setValue(element, value) {
    element.value = value;
  },

  getSizeInput(event) {
    const validateNRow = function validateNRow(nSide) {
      return (
        !isNaN(nSide) && Number.isInteger(nSide) && nSide > 0 && nSide <= 100
      ); // Is an integer between 1 and a 100;
    };

    const nSide = parseFloat(event.target.value);
    if (!validateNRow(nSide))
      throw new Error("The grid sizes has to be between 1 and 100.");
    return nSide;
  },

  innitSketch(nSide) {
    const penDown = function penDown(event) {
      View.draw(event); // click should paint the clicked tile
      DOM.container.addEventListener("mousemove", View.draw);
    };

    const penUp = function penUp() {
      saveGameState(DOM.cTiles);
      DOM.container.removeEventListener("mousemove", (e, bgCol) => draw(e));
    };

    let paintHistory = [[]];
    let cStatePointer = 0;

    showTiles(nSide);

    DOM.container.addEventListener("mousedown", penDown);
    DOM.body.addEventListener("mouseup", penUp);
    DOM.inputNRow.addEventListener("change", (event) => {
      const input = getSizeInput(event);
      setValue(DOM.inputNCol, input);
      showTiles(input);
      resetGameState();
    });
    DOM.inputNCol.addEventListener("change", (event) => {
      const input = getSizeInput(event);
      setValue(DOM.inputNRow, input);
      showTiles(input);
      resetGameState();
    });
    DOM.buttonArrowLeft.addEventListener("click", () => moveGameState(-1));
    DOM.buttonArrowRight.addEventListener("click", () => moveGameState(1));
  },
};

// Universal IN
const innitSize = 16;
Controller.innitSketch(innitSize);

export { Controller };
