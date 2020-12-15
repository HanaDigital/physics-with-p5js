// Defaults
let canvasSize = 500;

let cellSize = 20;

let cellsPerRow = canvasSize / cellSize;

let cells = [];
let aliveCells = [];

// Canvas Element
const canvas = document.getElementById("canvas");

// Canvas Size Controls
const canvasSizeText = document.getElementById("canvas-size");
canvasSizeText.innerText = canvasSize;
const canvasSizeUp = document.getElementById("canvas-size-up");
canvasSizeUp.addEventListener("click", canvasSizeIncrease);
const canvasSizeDown = document.getElementById("canvas-size-down");
canvasSizeDown.addEventListener("click", canvasSizeDecrease);

function canvasSizeIncrease() {
	if (canvasSize >= 1000) return;
	canvasSize += 100;
	setCanvasSize();
}

function canvasSizeDecrease() {
	if (canvasSize <= 100) return;
	canvasSize -= 100;
	setCanvasSize();
}

function setCanvasSize() {
	canvasSizeText.innerText = canvasSize;
	canvas.style.width = canvasSize + "px";
	canvas.style.height = canvasSize + "px";
	createCells();
}

setCanvasSize();

// Cell Size Elements
const cellSizeText = document.getElementById("cell-size");
cellSizeText.innerText = cellSize;
const cellSizeUp = document.getElementById("cell-size-up");
cellSizeUp.addEventListener("click", cellSizeIncrease);
const cellSizeDown = document.getElementById("cell-size-down");
cellSizeDown.addEventListener("click", cellSizeDecrease);

function cellSizeIncrease() {
	if (cellSize >= 50) return;
	cellSize += 10;
	setCellSize();
}

function cellSizeDecrease() {
	if (cellSize <= 10) return;
	cellSize -= 10;
	setCellSize();
}

function setCellSize() {
	cellsPerRow = canvasSize / cellSize;
	cellSizeText.innerText = cellSize;
	createCells();
}

function createCells() {
	canvas.innerHTML = "";
	cellsPerRow = canvasSize / cellSize;
	for (let x = 0; x < cellsPerRow * cellsPerRow; x++) {
		const cell = document.createElement("div");
		cell.className = "cell";
		cell.id = "cell" + x;
		cell.style.width = cellSize + "px";
		cell.style.height = cellSize + "px";
		cell.addEventListener("click", (e) => {
			const el = e.target;
			if (el.classList.contains("alive")) {
				el.classList.remove("alive");
				aliveCells = aliveCells.filter((id) => id != el.id);
			} else {
				el.classList.add("alive");
				aliveCells.push(el.id);
			}
		});
		canvas.appendChild(cell);
	}
	cells = document.getElementsByClassName("cell");
}

createCells();
