function setup() {
    createCanvas(800, 800);

    line1_x1 = 100;
    line1_y1 = 100;
    line1_x2 = 200;
    line1_y2 = 200;

    line2_x1 = 100;
    line2_y1 = 200;
    line2_x2 = 200;
    line2_y2 = 300;

    line1 = new Line(line1_x1, line1_y1, line1_x2, line1_y2);
    line2 = new Line(line2_x1, line2_y1, line2_x2, line2_y2);
}

function draw() {
    background(220);
    stroke(0, 0, 0);
    line1.draw();
    line2.draw();
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        line(this.x1, this.y1, this.x2, this.y2);
    }
}