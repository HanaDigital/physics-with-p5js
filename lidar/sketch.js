let walls = [];
let movers = [];
let particle;

let xoff = 0;
let yoff = 100000;

const lidarBeep = document.getElementById('lidar_audio');
const crash = document.getElementById('crash_audio');

let roadImage = null;
const roadResize = 250;
const roadWidth = 566 - roadResize;
const roadHeight = 360 - roadResize;

function setup() {
    createCanvas(1260, 630);
    // for (let i = 0; i < 5; i++) {
    //     const x1 = random(width);
    //     const y1 = random(height);
    //     const x2 = random(width);
    //     const y2 = random(height);
    //     walls[i] = new Boundary(x1, y1, x2, y2);
    // }

    walls.push(new Boundary(0, 0, width, 0, true));
    walls.push(new Boundary(width, 0, width, height, true));
    walls.push(new Boundary(width, height, 0, height, true));
    walls.push(new Boundary(0, height, 0, 0, true));

    // walls.push(new Boundary(width / 1.1, height / 1.1, width / 1.1, height / 6));
    walls.push(new Mover(width / 1.5, 60, width / 1.5, 0, 1, 0, Infinity));

    particle = new Particle();

    roadImage = loadImage('road.jpg');
}

function draw() {
    background(0);
    image(roadImage, 0, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth * 2, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth * 3, (height / 2) - roadHeight / 2, roadWidth, roadHeight);

    for (const wall of walls) {
        if (wall.velocity) wall.update();
        wall.show();
    }

    // particle.update(noise(xoff) * width, noise(yoff) * height);
    particle.update(mouseX, height / 2);
    particle.show();
    particle.look(walls);

    xoff += 0.01;
    yoff += 0.01;
}