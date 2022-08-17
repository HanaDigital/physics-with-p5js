const maxDistance = 400;
const carResize = 50;
const carWidth = 150 - carResize;
const carHeight = 96 - carResize;
class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let i = 0; i < 90; i++) {
            this.rays.push(new Ray(this.pos, radians(i - 45)))
        }
        this.carImage = loadImage('car.png');
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 16);
        for (const ray of this.rays) {
            ray.show();
        }
        image(this.carImage, this.pos.x - (carWidth), this.pos.y - (carHeight / 2), carWidth, carHeight);
    }

    look(walls) {
        let shouldBeep = false;
        let beepRate = 1;
        for (const ray of this.rays) {
            let closest = null;
            let record = Infinity;
            let isWall = false;
            let currentWall = null;
            for (const wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                        currentWall = wall;
                    }
                }
            }

            if (closest) {
                const distance = p5.Vector.dist(this.pos, closest);
                if (distance < maxDistance && !currentWall.dead) {
                    if (!currentWall.isWall) stroke((1 - (distance / maxDistance)) * 255, ((distance / maxDistance)) * 255, 0);
                    line(this.pos.x, this.pos.y, closest.x, closest.y);
                    stroke(255);
                    const newBeepRate = 1 + ((1 - (distance / maxDistance)) * 4);
                    if (newBeepRate > beepRate) {
                        beepRate = newBeepRate;
                    }
                    if (!currentWall.isWall) shouldBeep = true;

                    if (distance < 5) {
                        if (currentWall.stop) currentWall.stop();
                    }
                } else {
                    const x2 = this.pos.x + (maxDistance * Math.cos(ray.dir.heading()));
                    const y2 = this.pos.y + (maxDistance * Math.sin(ray.dir.heading()));
                    line(this.pos.x, this.pos.y, x2, y2);
                }
            }
        }

        if (shouldBeep) {
            lidarBeep.playbackRate = beepRate;
            lidarBeep.play();
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }
}