function setup() {
    createCanvas(800, 800);

    let nn = new NueralNetwork(2, 2, 1);
    let input = [1, 0];
    let output = nn.feedForward(input);
    console.log(output);
}

function draw() {
    background(220);
}