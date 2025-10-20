const DOM = {
  container: document.querySelector(".container"),
  body: document.querySelector("body"),
  inputNRow: document.querySelector(".nav__grid-size--height"),
  inputNCol: document.querySelector(".nav__grid-size--width"),
  buttonArrowLeft: document.querySelector(".nav__arrow--left"),
  buttonArrowRight: document.querySelector(".nav__arrow--right"),
  cTiles: [],
};

const createTile = function createTile(size, relSize) {
  const tile = document.createElement("div");
  tile.classList.add("container__tile");

  tile.style.flex = `0 0 ${relSize * 100}%`;
  tile.style.width = tile.style.height = `${size}px`;
  return tile;
};

const paintTile = function paintTile(tile, color) {
  tile.style.background = color;
  return;
};

const draw = function draw(event) {
  if (event.target.style.background && event.target.style.background !== "none")
    return;

  const randomGradient = `linear-gradient(${Math.floor(
    Math.random() * 360
  )}deg,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)`;
  paintTile(event.target, randomGradient);
};

const setValue = function setValue(element, value) {
  element.value = value;
};

const getSizeInput = function getSizeInput(event) {
  const validateNRow = function validateNRow(nSide) {
    return (
      !isNaN(nSide) && Number.isInteger(nSide) && nSide > 0 && nSide <= 100
    ); // Is an integer between 1 and a 100;
  };

  const nSide = parseFloat(event.target.value);
  if (!validateNRow(nSide) || !validateNRow(nSide))
    throw new Error("The grid sizes has to be between 1 and 100.");
  return nSide;
};

const innitSketch = function innitSketch(nSide) {
  const showTiles = function showTiles(nSide) {
    DOM.container.textContent = ""; // remove last state
    DOM.cTiles = [];
    paintHistory = [[]];

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
  };

  const saveGameState = function saveGameState(cTiles) {
    const cState = [];
    cTiles.forEach((tile, index) => {
      const tileBG = tile.style.background;
      if (tileBG && tileBG !== "none") {
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
  };

  const penDown = function penDown(event) {
    draw(event); // click should paint the clicked tile
    DOM.container.addEventListener("mousemove", draw);
  };

  const penUp = function penUp() {
    saveGameState(DOM.cTiles);
    DOM.container.removeEventListener("mousemove", draw);
  };

  const moveGameState = function moveGameState(step) {
    if (cStatePointer + step < 0 || cStatePointer + step >= paintHistory.length)
      return;
    cStatePointer += step;
    showGameState(cStatePointer);
  };

  const showGameState = function showGameState(stateIndex) {
    DOM.cTiles.forEach((tile) => (tile.style.background = "none"));
    const newState = paintHistory[stateIndex];
    console.log(paintHistory);
    newState.forEach((paintedObj) => {
      const paintedTile = DOM.cTiles[paintedObj.index];
      paintedTile.style.background = paintedObj.backgroundColor;
    });
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
  });
  DOM.inputNCol.addEventListener("change", (event) => {
    const input = getSizeInput(event);
    setValue(DOM.inputNRow, input);
    showTiles(input);
  });
  DOM.buttonArrowLeft.addEventListener("click", () => moveGameState(-1));
  DOM.buttonArrowRight.addEventListener("click", () => moveGameState(1));
};

innitSketch(16); // default number of tiles
