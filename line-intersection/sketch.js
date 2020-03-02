function setup() {
    createCanvas(800, 800);

    line1_x1 = 400;
    line1_y1 = 100;
    line1_x2 = 400;
    line1_y2 = 400;

    line2_x1 = 400;
    line2_y1 = 200;
    line2_x2 = 200;
    line2_y2 = 300;

    line1 = new Line(line1_x1, line1_y1, line1_x2, line1_y2);
    line2 = new Line(line2_x1, line2_y1, line2_x2, line2_y2);
}

function draw() {
    background(220);
    stroke('black');
    strokeWeight(1);
    line1.draw();
    line2.draw();

    line1.intersect(line2);
}