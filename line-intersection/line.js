class Line {
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;

    ogX2 = 0;
    ogY2 = 0

    slope = 0;
    constant = 0;

    hit = false;

    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.ogX2 = x2;
        this.ogY2 = y2;
    }

    draw() {
        line(this.x1, this.y1, this.x2, this.y2);
    }

    move(x) {
        this.x2 = this.x2 + x;
    }

    intersect(other) {
        // y = mx + c
        // Slope
        this.slope = (this.y2 - this.y1) / (this.x2 - this.x1);
        other.slope = (other.y2 - other.y1) / (other.x2 - other.x1);

        // Constant
        this.constant = this.y1 - (this.slope * this.x1)
        other.constant = other.y1 - (other.slope * other.x1)

        // point of intersection
        const poi_x = (other.constant - this.constant) / (this.slope - other.slope)
        const poi_y = (this.slope * poi_x) + this.constant;

        console.log(poi_x, poi_y)

        const trueLength = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2))
        const expectedLength = Math.sqrt(Math.pow(poi_x - this.x1, 2) + Math.pow(poi_y - this.y1, 2))

        if (Math.round(trueLength) >= Math.round(expectedLength)) { // If ray meets the wall
            if((poi_x >= other.x2 && poi_x <= other.x1) || (poi_y >= other.y2 && poi_y <= other.y1)) {
                this.hit = true
                this.x2 = poi_x;
                this.y2 = poi_y;

                stroke('red');
                strokeWeight(10);
                point(parseInt(poi_x, 10), parseInt(poi_y, 10));
            } else{
                if(this.hit) {
                    this.hit = false;
                    // console.log('points are: ' +this.x2 + this.y2);
                }
            }
        }
    }
}