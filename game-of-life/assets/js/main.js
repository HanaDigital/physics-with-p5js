// Defaults
let canvasSize = 500;
const minCanvasSize = 100;
const maxCanvasSize = 900;
const canvasSizeStep = 100;

let cellSize = 20;
const minCellSize = 10;
const maxCellSize = 20;
const cellSizeStep = 10;

let speed = 100;
let realSpeed = 10;
const maxSpeed = 100;
const speedStep = 10;
const speedLimiter = maxSpeed + speedStep;

// Variables
let cellsPerRow = canvasSize / cellSize;

let isRunning = false;
let isPaused = false;

let cells = [];
let aliveCells = [];
let impCells = [];
let turnAlive = [];
let turnDead = [];

// Ctrl Buttons
const run = document.getElementById("run");
const resume = document.getElementById("resume");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
const clear = document.getElementById("clear");

run.addEventListener("click", runGame);
async function runGame() {
	ctrlState("run");
	isRunning = true;
	while (isRunning) {
		gameStep();
		await sleep(realSpeed);
	}
}

resume.addEventListener("click", resumeGame);
function resumeGame() {
	ctrlState("resume");
	isPaused = false;
}

pause.addEventListener("click", pauseGame);
function pauseGame() {
	ctrlState("pause");
	isPaused = true;
}

stop.addEventListener("click", stopGame);
function stopGame() {
	ctrlState("stop");
	step = 0;
	isPaused = false;
	isRunning = false;
}

clear.addEventListener("click", resetCells);

function ctrlState(state) {
	run.style.display = state == "stop" ? "block" : "none";
	resume.style.display = state == "pause" ? "block" : "none";
	pause.style.display =
		state == "resume" || state == "run" ? "block" : "none";
	stop.style.display =
		state == "run" || state == "resume" || state == "pause"
			? "block"
			: "none";
	clear.style.display = state == "stop" ? "block" : "none";
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Speed Ctrls
const speedText = document.getElementById("speed");
const speedUp = document.getElementById("speed-up");
speedUp.addEventListener("click", increaseSpeed);
const speedDown = document.getElementById("speed-down");
speedDown.addEventListener("click", decreaseSpeed);

function increaseSpeed() {
	if (speed >= maxSpeed) return;
	speed += speedStep;
	calcRealSpeed();
}

function decreaseSpeed() {
	if (speed <= speedStep) return;
	speed -= speedStep;
	calcRealSpeed();
}

function calcRealSpeed() {
	realSpeed = speedLimiter - speed;
	speedText.innerText = speed;

	if (speed >= maxSpeed) {
		speedUp.style.opacity = "0";
		speedUp.style.cursor = "default";
	} else {
		speedUp.style.opacity = "1";
		speedUp.style.cursor = "pointer";
	}

	if (speed <= speedStep) {
		speedDown.style.opacity = "0";
		speedDown.style.cursor = "default";
	} else {
		speedDown.style.opacity = "1";
		speedDown.style.cursor = "pointer";
	}
}

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
	if (canvasSize >= maxCanvasSize || isRunning) return;
	canvasSize += canvasSizeStep;
	setCanvasSize();
}

function canvasSizeDecrease() {
	if (canvasSize <= minCanvasSize || isRunning) return;
	canvasSize -= canvasSizeStep;
	setCanvasSize();
}

function setCanvasSize() {
	canvasSizeText.innerText = canvasSize;
	canvas.style.width = canvasSize + "px";
	canvas.style.height = canvasSize + "px";

	if (canvasSize >= maxCanvasSize) {
		canvasSizeUp.style.opacity = "0";
		canvasSizeUp.style.cursor = "default";
	} else {
		canvasSizeUp.style.opacity = "1";
		canvasSizeUp.style.cursor = "pointer";
	}
	if (canvasSize <= minCanvasSize) {
		canvasSizeDown.style.opacity = "0";
		canvasSizeDown.style.cursor = "default";
	} else {
		canvasSizeDown.style.opacity = "1";
		canvasSizeDown.style.cursor = "pointer";
	}

	setCellSize();
}

// Steps
let step = 0;
const steps = document.getElementById("step");

function stepUp() {
	step++;
	steps.innerText = step;
}

function resetStep() {
	step = 0;
	steps.innerText = step;
}

// Cell Size Elements
const cellSizeText = document.getElementById("cell-size");
const cellSizeUp = document.getElementById("cell-size-up");
cellSizeUp.addEventListener("click", cellSizeIncrease);
const cellSizeDown = document.getElementById("cell-size-down");
cellSizeDown.addEventListener("click", cellSizeDecrease);

function cellSizeIncrease() {
	if (cellSize >= maxCellSize || isRunning) return;
	cellSize += cellSizeStep;
	setCanvasSize();
}

function cellSizeDecrease() {
	if (cellSize <= minCellSize || isRunning) return;
	cellSize -= cellSizeStep;
	setCanvasSize();
}

function setCellSize() {
	cellsPerRow = canvasSize / cellSize;
	cellSizeText.innerText = cellSize;

	if (cellSize >= maxCellSize) {
		cellSizeUp.style.opacity = "0";
		cellSizeUp.style.cursor = "default";
	} else {
		cellSizeUp.style.opacity = "1";
		cellSizeUp.style.cursor = "pointer";
	}
	if (cellSize <= minCellSize) {
		cellSizeDown.style.opacity = "0";
		cellSizeDown.style.cursor = "default";
	} else {
		cellSizeDown.style.opacity = "1";
		cellSizeDown.style.cursor = "pointer";
	}

	createCells();
}

function createCells() {
	canvas.innerHTML = "";
	cellsPerRow = canvasSize / cellSize;
	cells = [];
	aliveCells = [];
	for (let x = 0; x < cellsPerRow * cellsPerRow; x++) {
		const cell = document.createElement("div");
		cell.className = "cell";
		cell.id = "c" + x;
		cell.style.width = cellSize + "px";
		cell.style.height = cellSize + "px";
		cell.setAttribute("index", x);
		cell.addEventListener("click", (e) => {
			if (isRunning) return;
			const el = e.target;
			if (el.classList.contains("alive")) {
				el.classList.remove("alive");
				aliveCells = aliveCells.filter(
					(id) => id != el.getAttribute("index")
				);
			} else {
				el.classList.add("alive");
				aliveCells.push(parseInt(el.getAttribute("index")));
			}
		});
		canvas.appendChild(cell);
	}
	cells = document.getElementsByClassName("cell");
}

function resetCells() {
	step = 0;
	aliveCells = [];
	setCanvasSize();
	resetStep();
	calcRealSpeed();
}

resetCells();
