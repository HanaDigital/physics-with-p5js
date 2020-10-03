class Line {
    x1 = 0;
    y1 = 0;
    length = 0;
    angle = 0;

    i_x2 = 0;
    i_y2 = 0;
    i_length = 0;

    x2 = 0;
    y2 = 0;

    slope = 0;
    constant = 0;

    hit = false;

    constructor(x1, y1, length, angle) {
        this.x1 = x1;
        this.y1 = y1;
        this.length = length;
        this.angle = angle * (Math.PI / 180); // changing to degrees
        
        this.ogLength = length;
    }

    draw() {
        this.x2 = this.x1 + (this.length * Math.sin(this.angle))
        this.y2 = this.y1 + (this.length * Math.cos(this.angle))

        if(this.hit) {
            this.i_x2 = this.x1 + (this.i_length * Math.sin(this.angle))
            this.i_y2 = this.y1 + (this.i_length * Math.cos(this.angle))
            line(this.x1, this.y1, this.i_x2, this.i_y2);
        } else {

            line(this.x1, this.y1, this.x2, this.y2);
        }
    }

    move(x) {
        this.angle += x;
    }

    intersect(other){
        const denominator = ((this.x1 - this.x2) * (other.y1 - other.y2)) - ((this.y1 - this.y2) * (other.x1 - other.x2)) 
        if(denominator == 0) {
            console.log("The lines are parallel");
            return undefined;
        }

        const t = (((this.x1 - other.x1) * (other.y1 - other.y2)) - ((this.y1 - other.y1) * (other.x1 - other.x2))) / denominator;
        const u = (((this.x1 - this.x2) * (this.y1 - other.y1)) - ((this.y1 - this.y2) * (this.x1 - other.x1))) / denominator;

        if(t > 0 && t < 1 && u < 0) {
            this.hit = true;
            const poi_x = (this.x1 + t * (this.x2 - this.x1));
            const poi_y = (this.y1 + t * (this.y2 - this.y1));

            this.i_length = Math.sqrt(Math.pow(this.x1 - poi_x, 2) + Math.pow(this.y1 - poi_y, 2));

            stroke('red');
            ellipse(poi_x, poi_y, 16);
        } else {
            this.hit = false;
        }
        return "GOOD TO GO"
    }
}

// intersect(other) {
    //     // y = mx + c
    //     // Slope
    //     this.slope = (this.y2 - this.y1) / (this.x2 - this.x1);
    //     other.slope = (other.y2 - other.y1) / (other.x2 - other.x1);

    //     // Constant
    //     this.constant = this.y1 - (this.slope * this.x1)
    //     other.constant = other.y1 - (other.slope * other.x1)

    //     // point of intersection
    //     const poi_x = (other.constant - this.constant) / (this.slope - other.slope)
    //     const poi_y = (this.slope * poi_x) + this.constant;

    //     // console.log(poi_x, poi_y)

    //     const trueLength = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2))
    //     const expectedLength = Math.sqrt(Math.pow(poi_x - this.x1, 2) + Math.pow(poi_y - this.y1, 2))

    //     if (Math.round(trueLength) >= Math.round(expectedLength)) { // If ray meets the wall
    //         if((poi_x >= other.x1 || poi_x <= other.x2) && (poi_y >= other.y1 || poi_y <= other.y2)) {
    //             console.log("HIT")
    //             this.hit = true

    //             this.x2 = poi_x;
    //             this.y2 = poi_y;

    //             stroke('red');
    //             strokeWeight(10);
    //             point(parseInt(poi_x, 10), parseInt(poi_y, 10));
    //         } else{
    //             if(this.hit) {
    //                 this.hit = false;
    //                 // console.log('points are: ' +this.x2 + this.y2);
    //             }
    //         }
    //     }
    // }