const zombieResize = 200;
const zombieWidth = 288 - zombieResize;
const zombieHeight = 311 - zombieResize;

class Mover {
    constructor(x1, y1, x2, y2, velocity, minHeight, maxHeight, path) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
        this.velocity = velocity;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.zombieImage = loadImage(path);
        this.dead = false;
    }

    show() {
        stroke(255);
        //line(this.a.x, this.a.y, this.b.x, this.b.y);
        push();
        if (this.velocity > 0) {
            translate(this.a.x - zombieWidth + 130, this.a.y - zombieHeight / 1.3);
            rotate(45);
        } else {
            translate(this.a.x - zombieWidth + 40, this.a.y - zombieHeight + 90);
            rotate(-45);
        }
        image(this.zombieImage, 0, 0, zombieWidth, zombieHeight);
        pop();
    }

    update() {
        this.a.y = this.a.y + this.velocity;
        this.b.y = this.b.y + this.velocity;
        if (this.a.y < this.minHeight || this.b.y > this.maxHeight) {
            this.velocity = -this.velocity;
        }
    }

    stop() {
        this.velocity = 0;
        this.zombieImage = loadImage('blood.png');
        crash.play();
        this.dead = true;
    }
}