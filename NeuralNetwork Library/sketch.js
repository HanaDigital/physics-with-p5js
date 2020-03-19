var brain;

function setup() {
    createCanvas(800, 800);

    brain = new NeuralNetwork(3, 3, 1);
}

function draw() {
    background(220);
}