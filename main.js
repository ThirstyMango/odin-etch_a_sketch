import { DOM } from "./scripts/dom.js";
import { View } from "./scripts/view.js";
import { Model } from "./scripts/model.js";

const Controller = {
  setValue(element, value) {
    element.value = value;
  },

  resetGameState() {
    Model.paintHistory = [[]];
    Model.cStatePointer = 0;
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
    const drawHandler = function drawHandler(event) {
      View.draw(event, DOM.buttonColor.value);
    };

    const penDown = function penDown(event) {
      View.draw(event); // click should paint the clicked tile
      DOM.container.addEventListener("mousemove", drawHandler);
    };

    const penUp = function penUp() {
      Model.saveGameState(DOM.cTiles);
      DOM.container.removeEventListener("mousemove", drawHandler);
    };

    View.showTiles(nSide);

    DOM.container.addEventListener("mousedown", penDown);
    DOM.body.addEventListener("mouseup", penUp);
    DOM.inputNRow.addEventListener("change", (event) => {
      const input = this.getSizeInput(event);
      setValue(DOM.inputNCol, input); // set the grid to be a x a all the time
      showTiles(input);
      resetGameState();
    });
    DOM.inputNCol.addEventListener("change", (event) => {
      const input = getSizeInput(event);
      setValue(DOM.inputNRow, input);
      showTiles(input);
      resetGameState();
    });
    DOM.buttonArrowLeft.addEventListener("click", () => {
      Model.moveGameState(-1); // changes cStatePointer
      const cState = Model.paintHistory[Model.cStatePointer];
      View.showGameState(cState);
    });
    DOM.buttonArrowRight.addEventListener("click", () => {
      Model.moveGameState(1);
      const cState = Model.paintHistory[Model.cStatePointer];
      View.showGameState(cState);
    });
  },
};

// Universal IN
const innitSize = 16;
Controller.innitSketch(innitSize);

export { Controller };
