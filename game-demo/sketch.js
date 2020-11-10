const area = 600;
const color = 'black';

let playArea;

let player;
let enemy;

function setup() {
    createCanvas(windowWidth, windowHeight);
    playArea = {
        x: windowWidth / 2 - area / 2,
        y: windowHeight / 2 - area / 2,
        width: area,
        height: area
    };

    player = new Entity(playArea, color, 'red', 10, 'point');
    enemy = new Entity(playArea, color, 'red', 0, 'triangle', 50);
}

function draw() {
    background(220);

    stroke(color);
    drawingContext.setLineDash([]);
    strokeWeight(2);
    square(playArea.x, playArea.y, playArea.width);

    player.move(mouseX, mouseY);
    enemy.move(mouseX, mouseY);

    player.draw();
    // enemy.draw();

    stroke('rgba(0, 100, 200, 0.2)');
    strokeWeight(10);
    point(mouseX, mouseY);

    drawingContext.setLineDash([1, 10]);
    stroke('rgba(0, 0, 0, 0.2)');
    strokeWeight(5);
    line(player.pos.x, player.pos.y, mouseX, mouseY);
}