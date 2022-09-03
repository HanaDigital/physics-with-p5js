let clicked = false;
document.addEventListener("click", () => {
    clicked = true;
});

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

const maxDistance = 300;

function setup() {
    createCanvas(1440, 785);
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

    // truck
    walls.push(new Boundary(width / 1.2, height / 1.5, width / 1.2, height / 4));
    // zombie
    //walls.push(new Mover(width / 1.5, 60, width / 1.5, 0, 1.5, 0, height, 'zombie.gif'));

    particle = new Particle(5);

    roadImage = loadImage('road.jpg');
}

function draw() {
    background(0);
    image(roadImage, 0, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth * 2, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth * 3, (height / 2) - roadHeight / 2, roadWidth, roadHeight);
    image(roadImage, roadWidth * 4, (height / 2) - roadHeight / 2, roadWidth, roadHeight);

    for (const wall of walls) {
        wall.show();
    }
    particle.show();
    particle.look(walls);

    // particle.update(noise(xoff) * width, noise(yoff) * height);
    if (clicked) {
        particle.update();
        for (const wall of walls) {
            if (wall.velocity) wall.update();
        }
    }

    xoff += 0.01;
    yoff += 0.01;
}