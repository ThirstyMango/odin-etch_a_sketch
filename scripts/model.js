import { Controller } from "../main";

const Model = {
  saveGameState(cTiles) {
    const cState = [];
    cTiles.forEach((tile, index) => {
      const tileBG = tile.style.backgroundColor;
      if (tileBG && tileBG !== "transparent") {
        cState.push({ index, backgroundColor: tileBG });
      }
    });

    if (paintHistory[cStatePointer].length !== cState.length) {
      paintHistory.push(cState);
      cStatePointer++;
      return;
    }

    for (let i = 0; i < cState.length; i++) {
      if (
        JSON.stringify(paintHistory[cStatePointer][i]) !==
        JSON.stringify(cState[i])
      ) {
        paintHistory.push(cState);
        cStatePointer++;
        return;
      }
    }
  },

  resetGameState() {
    paintHistory = [[]];
    cStatePointer = 0;
  },

  moveGameState(step) {
    if (cStatePointer + step < 0 || cStatePointer + step >= paintHistory.length)
      return;
    cStatePointer += step;
    showGameState(cStatePointer);
  },
};

// Properties to add
let paintHistory = [[]];
let cStatePointer = 0;

export { Model };
