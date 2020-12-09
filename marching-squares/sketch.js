const rez = 10;
let cols, rows;
const field = [];
const seed = Date.now();
const openSimplex = openSimplexNoise(seed);
const increment = 0.01;
let zIncrement = 0;
let xoff = 0;
let yoff = 0;
let zoff = 0;

let walls = [];
let particle;

function setup() {
	createCanvas(800, 800);
	cols = 1 + width / rez;
	rows = 1 + height / rez;

	particle = new Particle();
}

function draw() {
	walls = [];
	walls.push(new Boundary(createVector(0, 0), createVector(width, 0)));
	walls.push(
		new Boundary(createVector(width, 0), createVector(width, height))
	);
	walls.push(
		new Boundary(createVector(width, height), createVector(0, height))
	);
	walls.push(new Boundary(createVector(0, height), createVector(0, 0)));

	background(0);

	xoff += increment;
	yoff += increment;
	for (let i = 0; i < cols; i++) {
		xoff += increment;
		yoff = 0;
		field[i] = [];
		for (let j = 0; j < height; j++) {
			field[i][j] = openSimplex.noise3D(xoff, yoff, zoff);
			yoff += increment;
		}
	}
	zoff += zIncrement;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < height; j++) {
			stroke(field[i][j] * 255);
			strokeWeight(rez * 0.4);
			point(i * rez, j * rez);
		}
	}

	geometry();

	for (const wall of walls) {
		wall.show();
	}

	particle.update(mouseX, mouseY);
	particle.show();
	particle.look(walls);
}

function getState(a, b, c, d) {
	return a * 8 + b * 4 + c * 2 + d * 1;
}

function lineGen(v1, v2) {
	walls.push(new Boundary(v1, v2));
}

function geometry() {
	stroke(255);
	strokeWeight(1);
	for (let i = 0; i < cols - 1; i++) {
		for (let j = 0; j < height - 1; j++) {
			let x = i * rez;
			let y = j * rez;
			let a = createVector(x + rez * 0.5, y);
			let b = createVector(x + rez, y + rez * 0.5);
			let c = createVector(x + rez * 0.5, y + rez);
			let d = createVector(x, y + rez * 0.5);
			let state = getState(
				ceil(field[i][j]),
				ceil(field[i + 1][j]),
				ceil(field[i + 1][j + 1]),
				ceil(field[i][j + 1])
			);
			switch (state) {
				case 1:
					lineGen(c, d);
					break;
				case 2:
					lineGen(b, c);
					break;
				case 3:
					lineGen(b, d);
					break;
				case 4:
					lineGen(a, b);
					break;
				case 5:
					lineGen(a, d);
					lineGen(b, c);
					break;
				case 6:
					lineGen(a, c);
					break;
				case 7:
					lineGen(a, d);
					break;
				case 8:
					lineGen(a, d);
					break;
				case 9:
					lineGen(a, c);
					break;
				case 10:
					lineGen(a, b);
					lineGen(c, d);
					break;
				case 11:
					lineGen(a, b);
					break;
				case 12:
					lineGen(b, d);
					break;
				case 13:
					lineGen(b, c);
					break;
				case 14:
					lineGen(c, d);
					break;
			}
		}
	}
}
