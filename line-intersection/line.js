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

    intersect(other) {

        let slope;
        let slope1;
        let slope2;
        let eq;
        let eq1;
        let eq2;
        let xi;
        let yi;

        slope1 = (this.y2 - this.y1) / (this.x2 - this.x1)
        slope2 = (other.y2 - other.y1) / (other.x2 - other.x1)

        if(slope1 != slope2) {
            eq1 = (slope1 * -this.x1) + this.y1;
            eq2 = (slope2 * -other.x1) + other.y1;
           // print(slope1);
           
           slope = slope1 + (-slope2);
           eq = -eq1 + eq2;
           
           xi = eq / slope;
           
           yi = (slope1 * xi) + eq1;
           print(xi + " " + yi);
           
           strokeWeight(10);
           stroke('red');
           point(xi, yi);
         }
    } 
}