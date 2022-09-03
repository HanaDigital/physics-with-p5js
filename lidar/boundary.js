const truckResize = 400;
const truckWidth = 1224 - truckResize;
const truckHeight = 569 - truckResize;

class Boundary {
    constructor(x1, y1, x2, y2, isWall = false, velocity, minHeight, maxHeight) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
        this.isWall = isWall
        this.velocity = velocity;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.truckImage = loadImage("truck.png");

    }

    show() {
        stroke(255);
        //line(this.a.x, this.a.y, this.b.x, this.b.y);
        if(!this.isWall){
            push()
            translate(this.a.x - truckWidth + 1000, this.a.y - truckHeight - 300);
            rotate(-80)
            image(this.truckImage, 0, 0, truckWidth, truckHeight);
            pop ()
        }
    }

    update() {
        this.a.y = this.a.y + this.velocity;
        this.b.y = this.b.y + this.velocity;
        if (this.a.y < this.minHeight || this.b.y > this.maxHeight) {
            this.velocity = -this.velocity;
        }
    }

    stop() {
        crash.play();
    }
}