function setup() {
    createCanvas(800, 800);

    ray_x1 = 500;
    ray_y1 = 100;
    ray_x2 = 600;
    ray_y2 = 400;

    wall_x1 = 500;
    wall_y1 = 300;
    wall_x2 = 200;
    wall_y2 = 200;

    ray = new Line(ray_x1, ray_y1, ray_x2, ray_y2);
    wall = new Line(wall_x1, wall_y1, wall_x2, wall_y2);
}

function draw() {
    background(220);
    stroke('black');
    strokeWeight(1);

    wall.draw();
    stroke('brown');
    ray.draw();

    ray.intersect(wall)
    // ray.move(-1)
}