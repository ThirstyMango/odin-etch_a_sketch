const View = {
  createTile(size, relSize) {
    const tile = document.createElement("div");
    tile.classList.add("container__tile");

    tile.style.flex = `0 0 ${relSize * 100}%`;
    tile.style.width = tile.style.height = `${size}px`;
    return tile;
  },

  paintTile(tile, bgColor) {
    tile.style.backgroundColor = DOM.buttonColor.value;
    return;
  },

  draw(event, bgColor) {
    this.paintTile(event.target, bgColor);
  },

  showTiles(nSide) {
    DOM.container.textContent = ""; // remove last state
    DOM.cTiles = [];
    resetGameState();

    const nChildren = Math.pow(nSide, 2);
    const tileSize = DOM.container.offsetWidth / nSide;
    const tileFlexBase = tileSize / DOM.container.offsetWidth;

    let tile = createTile(tileSize, tileFlexBase);
    DOM.cTiles.push(tile);
    for (let i = 0; i < nChildren; i++) {
      DOM.container.appendChild(tile);
      tile = createTile(tileSize, tileFlexBase);
      DOM.cTiles.push(tile);
    }

    // Corner tiles are rounded
    DOM.container.childNodes[0].classList.add("container__tile--corner-tl");
    DOM.container.childNodes[nSide - 1].classList.add(
      "container__tile--corner-tr"
    );
    DOM.container.childNodes[nChildren - nSide].classList.add(
      "container__tile--corner-bl"
    );
    DOM.container.childNodes[nChildren - 1].classList.add(
      "container__tile--corner-br"
    );
  },

  showGameState(stateIndex) {
    DOM.cTiles.forEach((tile) => (tile.style.backgroundColor = "transparent"));
    const newState = paintHistory[stateIndex];
    newState.forEach((paintedObj) => {
      const paintedTile = DOM.cTiles[paintedObj.index];
      paintedTile.style.backgroundColor = paintedObj.backgroundColor;
    });
  },
};

export { View };
