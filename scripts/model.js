const Model = {
  paintHistory: [[]],

  cStatePointer: 0,

  saveGameState(cTiles) {
    const cState = [];
    cTiles.forEach((tile, index) => {
      const tileBG = tile.style.backgroundColor;
      if (tileBG && tileBG !== "transparent") {
        cState.push({ index, backgroundColor: tileBG });
      }
    });

    if (this.paintHistory[this.cStatePointer].length !== cState.length) {
      this.paintHistory.push(cState);
      this.cStatePointer++;
      return;
    }

    for (let i = 0; i < cState.length; i++) {
      if (
        JSON.stringify(this.paintHistory[this.cStatePointer][i]) !==
        JSON.stringify(cState[i])
      ) {
        this.paintHistory.push(cState);
        this.cStatePointer++;
        return;
      }
    }
  },

  moveGameState(step) {
    if (
      this.cStatePointer + step < 0 ||
      this.cStatePointer + step >= this.paintHistory.length
    )
      return;
    this.cStatePointer += step;
  },
};

export { Model };
