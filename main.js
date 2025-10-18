const DOM = {
  container: document.querySelector(".container"),
  body: document.querySelector("body"),
  inputNRow: document.querySelector(".header__grid-size--height"),
  inputNCol: document.querySelector(".header__grid-size--width"),
};

const createTile = function createTile(size, relSize) {
  const tile = document.createElement("div");
  tile.classList.add("container__tile");

  tile.style.flex = `0 0 ${Math.floor(relSize * 100 * 100) / 100}%`;
  tile.style.width = tile.style.height = `${size}px`;
  return tile;
};

const paintTile = function paintTile(tile, color) {
  tile.style.background = color;
  return;
};

const draw = function draw(event) {
  const randomGradient = `linear-gradient(${Math.floor(
    Math.random() * 360
  )}deg,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)`;
  paintTile(event.target, randomGradient);
  return;
};

const penDown = function penDown(event) {
  draw(event); // click should paint the clicked tile
  DOM.container.addEventListener("mousemove", draw);
};

const penUp = function penUp() {
  DOM.container.removeEventListener("mousemove", draw);
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

    const nChildren = Math.pow(nSide, 2);
    const tileSize = DOM.container.offsetWidth / nSide;
    const tileFlexBase = tileSize / DOM.container.offsetWidth;

    let tile = createTile(tileSize, tileFlexBase);
    for (let i = 0; i < nChildren; i++) {
      DOM.container.appendChild(tile);
      tile = createTile(tileSize, tileFlexBase);
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
};

innitSketch(16); // default number of tiles
