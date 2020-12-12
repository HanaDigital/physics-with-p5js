function setup() {
	createCanvas(128, 128);
}

function draw() {
	background(220);

	strokeWeight(4);
	let r = random(24, 64);
	let x = random(r, width - r);
	let y = random(r, height - r);
	stroke(random(100), random(100), random(100));
	circle(x, y, r);
}
