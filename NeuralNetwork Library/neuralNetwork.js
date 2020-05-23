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
        this.bias_h.randomize();
        this.bias_o.randomize();

        // Define learning rate
        this.learning_rate = 0.1;
    }

    feedForward(input_array) {
        // Conver input array to a matrix
        let input = Matrix.fromArray(input_array);

        // Init and execute hidden layer
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        // Init and execute output layer
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);

        return outputs.toArray();
    }

    train(inputs, targets) {
        // Conver input array to a matrix
        let input = Matrix.fromArray(inputs);

        // Init and execute hidden layer
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        // Init and execute output layer
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);
        outputs = outputs.toArray();

        // Conver arrays to matrix
        outputs = Matrix.fromArray(outputs); 
        targets = Matrix.fromArray(targets);

        // Calculate error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);
        // Calculate gradient
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);

        // Calculate deltas
        let hidden_T = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

        this.weights_ho.add(weight_ho_deltas);

        // Hidden layer errors
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors)

        // Calculate hidden gradient
        let hidden_gradients = Matrix.map(hidden, dsigmoid);
        hidden_gradients.multiply(hidden_errors);
        hidden_gradients.multiply(this.learning_rate);

        // Calculate input -> hidden deltas
        let inputs_T = Matrix.transpose(input);
        let weight_ih_deltas = Matrix.multiply(hidden_gradients, inputs_T);

        this.weights_ih.add(weight_ih_deltas);
    }
}

// Global activation function
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
    // return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
}