class NueralNetwork {
    // Inititalize the neural network
    constructor(input_nodes, hidden_nodes, output_nodes) {
        // Define number of nodes
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        // Define weights for each layer
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        // Define bias for each layer
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
    }

    feedForward(input_array) {
        // Conver input array to a matrix
        let input = Matrix.fromArray(input_array);

        // Init and execute hidden layer
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        // Init and execute output layer
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }

    train(inputs, targets) {
        let outputs = this.feedForward(inputs);
        // Conver arrays to matrix
        outputs = Matrix.fromArray(outputs); 
        targets = Matrix.fromArray(targets);

        // Calculate error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors)
    }
}

// Global activation function
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}