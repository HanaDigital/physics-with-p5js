class Boundary {
    constructor(x1, y1, x2, y2, isWall = false, velocity, minHeight, maxHeight) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
        this.isWall = isWall
        this.velocity = velocity;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
    }

    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
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