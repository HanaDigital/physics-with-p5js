let canvasWidth = 800;
let canvasHeight = 800;
const canvas = document.getElementById("canvas");
canvas.style.width = canvasWidth;
canvas.style.height = canvasHeight;
const canvasSize = document.getElementById("canvas-size");

const sizeInput = document.getElementById("size");

function canvasSizeUp() {
	if (canvasWidth >= 1000) return;
	canvasWidth += 100;
	canvasHeight += 100;
	setCanvasSize();
}

function canvasSizeDown() {
	if (canvasWidth <= 100) return;
	canvasWidth -= 100;
	canvasHeight -= 100;
	setCanvasSize();
}

function setCanvasSize() {
	canvasSize.innerText = canvasWidth;
	canvas.style.width = canvasWidth + "px";
	canvas.style.height = canvasHeight + "px";
}
