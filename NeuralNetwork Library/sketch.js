function setup() {
    createCanvas(800, 800);

    let nn = new NueralNetwork(2, 2, 1);
    let inputs = [1, 0];
    let targets = [1];

    nn.train(inputs, targets);
}

function draw() {
    background(220);
}