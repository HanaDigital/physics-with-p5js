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
    stroke(0, 0, 0);
    strokeWeight(1);
    line1.draw();
    line2.draw();
    // line1.move(1);

    slope1 = (line1.y2 - line1.y1) / (line1.x2 - line1.x1)
    slope2 = (line2.y2 - line2.y1) / (line2.x2 - line2.x1)
    // print(slope2)
    strokeWeight(10);
    stroke('purple');
    // point((400/1.5), (400/1.5));
    
    if(slope1 != slope2) {
       eq1 = (slope1 * -line1.x1) + line1.y1;
       eq2 = (slope2 * -line2.x1) + line2.y1;
      // print(slope1);
      
      slope = slope1 + (-slope2);
      eq = -eq1 + eq2;
      
      xi = eq / slope;
      
      yi = (slope1 * xi) + eq1;
      print(xi + " " + yi);
      
      point(xi, yi);
    }
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

    move(x) {
        this.x1 = this.x1 + x;
    }
}