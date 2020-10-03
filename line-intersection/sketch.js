function setup() {
    createCanvas(800, 800);

    ray_x1 = 500;
    ray_y1 = 100;
    ray_length = 100;
    ray_angle = -80;

    wall_x1 = 450;
    wall_y1 = 100;
    wall_length = 100;
    wall_angle = 10;

    ray = new Line(ray_x1, ray_y1, ray_length, ray_angle);
    wall = new Line(wall_x1, wall_y1, wall_length, wall_angle);
}

function draw() {
    background(220);
    stroke('black');
    strokeWeight(1);

    wall.draw();
    stroke('brown');
    ray.draw();

    ray.move(0.05)
    // wall.move(0.1);
    console.log(ray.intersect(wall));
}