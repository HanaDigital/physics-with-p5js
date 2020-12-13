// Make connection
const socket = io.connect("http://94.201.115.91:4200");
let x = 0;
let y = 0;
let ogX = 0;
let ogY = 0;
let moved = false;

let posX = 0;
let posY = 0;

let enemyX = 0;
let enemyY = 0;

function setup() {
	createCanvas(800, 800);
}

function draw() {
	background(220);
	if (ogX != mouseX) {
		x = mouseX;
		ogX = x;
		if (x < 0) x = 0;
		else if (x > width) x = width;
		moved = true;
	}
	if (ogY != mouseY) {
		y = mouseY;
		ogY = y;
		if (y < 0) y = 0;
		else if (y > height) y = height;
		moved = true;
	}
	if (moved) {
		socket.emit("pos", { x: x, y: y });
		moved = false;
	}

	stroke("green");
	strokeWeight(10);
	point(posX, posY);

	stroke("red");
	strokeWeight(10);
	point(enemyX, enemyY);
}

// Listen for events
socket.on("pos", (data) => {
	if (data.uid == socket.id) {
		posX = data.x;
		posY = data.y;
	} else {
		enemyX = data.x;
		enemyY = data.y;
	}
});
