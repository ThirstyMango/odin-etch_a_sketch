const DOM = {
  container: document.querySelector(".container"),
  body: document.querySelector("body"),
  inputField: document.querySelector(".header__number-input"),
  generateButton: document.querySelector(".header__button"),
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

const getNRowInput = function getNRowInput() {
  const validateNRow = function validateNRow(nRow) {
    return !isNaN(nRow) && Number.isInteger(nRow) && nRow > 0 && nRow <= 100; // Is an integer between 1 and a 100;
  };

  const nRow = parseFloat(DOM.inputField.value);
  if (!validateNRow(nRow))
    throw new Error(
      "The number of tiles has to be an integer between 1 and 100."
    );
  return nRow;
};

const innitSketch = function innitSketch(nRow) {
  const showTiles = function showTiles(nRow) {
    DOM.container.textContent = ""; // remove last state
    const nChildren = Math.pow(nRow, 2);

    const tileSize = DOM.container.offsetWidth / nRow;
    const tileRelSize = tileSize / DOM.container.offsetWidth;

    let tile = createTile(tileSize, tileRelSize);
    for (let i = 0; i < nChildren; i++) {
      DOM.container.appendChild(tile);
      tile = createTile(tileSize, tileRelSize);
    }

    // Corner tiles are rounded
    DOM.container.childNodes[0].classList.add("container__tile--corner-tl");
    DOM.container.childNodes[nRow - 1].classList.add(
      "container__tile--corner-tr"
    );
    DOM.container.childNodes[nChildren - nRow].classList.add(
      "container__tile--corner-bl"
    );
    DOM.container.childNodes[nChildren - 1].classList.add(
      "container__tile--corner-br"
    );

    return;
  };

  showTiles(nRow);

  DOM.container.addEventListener("mousedown", penDown);
  DOM.body.addEventListener("mouseup", penUp);
  DOM.generateButton.addEventListener("click", () => showTiles(getNRowInput()));
};

innitSketch(16); // default number of tiles
