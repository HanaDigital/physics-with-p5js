let walls = [];
let particle;

let xoff = 0;
let yoff = 100000;

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 5; i++) {
        const x1 = random(width);
        const y1 = random(height);
        const x2 = random(width);
        const y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }

    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));

    particle = new Particle();
}

function draw() {
    background(0);
    for (const wall of walls) {
        wall.show();
    }
    // particle.update(noise(xoff) * width, noise(yoff) * height);
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);

    xoff += 0.01;
    yoff += 0.01;
}