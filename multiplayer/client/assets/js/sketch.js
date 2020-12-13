// Make connection
const socket = io.connect("http://94.201.115.91:4200");
let x = 0;
let y = 0;
let ogX = 0;
let ogY = 0;
let prevX = 0;
let prevY = 0;
let moved = false;

let pWidth = 100;
let pHeight = 100;

let players = [];
let color = "green";

function setup() {
	createCanvas(800, 800);
}

function draw() {
	background(220);
	if (ogX != mouseX) {
		x = mouseX;
		ogX = x;
		if (x < 0) x = 0;
		else if (x > width - pWidth) x = width - pWidth;
		moved = true;
	}
	if (ogY != mouseY) {
		y = mouseY;
		ogY = y;
		if (y < 0) y = 0;
		else if (y > height - pHeight) y = height - pHeight;
		moved = true;
	}

	strokeWeight(0);
	color = "green";
	for (player of players) {
		if (player.dead || player.id == socket.id) continue;
		fill("red");
		rect(player.x, player.y, pWidth, pHeight);
		if (x + pWidth > player.x && x < player.x + pWidth) {
			if (y + pHeight > player.y && y < player.y + pHeight) {
				color = "blue";
				x = prevX;
				y = prevY;
			}
		}
	}

	fill(color);
	rect(x, y, pWidth, pHeight);

	if (moved) {
		socket.emit("pos", { x: x, y: y });
		moved = false;
	}

	prevX = x;
	prevY = y;
}

// Listen for events
socket.on("pos", (data) => {
	players = data;
});
