class Entity {
    constructor(playArea, color, edgeColor, edgeSize, shape, size) {
        this.pos = createVector(0, 0);
        this.playArea = playArea;
        this.color = color;
        this.edgeColor = edgeColor;
        this.edgeSize = edgeSize;
        this.shape = shape;
        this.size = size;
    }

    move(x, y) {
        stroke(this.color);
        strokeWeight(this.edgeSize);

        this.pos.x = x;
        this.pos.y = y;

        // Horizontal Limit
        if (this.pos.x < this.playArea.x) {
            this.pos.x = this.playArea.x;
            stroke(this.edgeColor);
        } else if (this.pos.x > this.playArea.x + this.playArea.width) {
            this.pos.x = this.playArea.x + this.playArea.width;
            stroke(this.edgeColor);
        }

        // Vertical Limit
        if (this.pos.y < this.playArea.y) {
            this.pos.y = this.playArea.y;
            stroke(this.edgeColor);
        } else if (this.pos.y > this.playArea.y + this.playArea.height) {
            this.pos.y = this.playArea.y + this.playArea.height;
            stroke(this.edgeColor);
        }
    }

    draw() {
        push();
        if (this.shape == 'point') point(this.pos.x, this.pos.y);
        else if (this.shape == 'triangle') {
            const topPoint = createVector(this.pos.x, this.pos.y);
            const bottomLeftPoint = createVector(this.pos.x - (this.size / 2), this.pos.y - this.size);
            const bottomRightPoint = createVector(this.pos.x + (this.size / 2), this.pos.y - this.size);
            fill('magenta');
            triangle(topPoint.x, topPoint.y,
                bottomLeftPoint.x, bottomLeftPoint.y,
                bottomRightPoint.x, bottomRightPoint.y);
        }
        pop();
    }
}