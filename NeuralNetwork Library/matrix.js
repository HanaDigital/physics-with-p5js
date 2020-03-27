class Matrix {
    // Defines a row x col matrix filled with zeros
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for(let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    // Add a scalar number to each value of the matrix
    add(n) {
        if(n instanceof Matrix) {
            for(let i = 0; i < this.rows; i++) {
                for(var j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for(let i = 0; i < this.rows; i++) {
                for(var j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    // Return new matrix => a - b
    static subtract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        for(let i = 0; i < result.rows; i++) {
            for(var j = 0; j < result.cols; j++) {
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    // Multiply a scalar number to each value of the matrix
    multiply(n) {
        for(let i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }

    // Multiply two matrix and return it
    static multiply(a, b) {
        if(a.cols !== b.rows) {
            console.log('Columns of A does not match Rows of B!')
            return undefined;
        }
        let result = new Matrix(a.rows, b.cols);
        for(let i = 0; i < result.rows; i++) {
            for(let j = 0; j < result.cols; j++) {
                let sum = 0;
                for(let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    // Apply a function to each value of the matrix
    map(func) {
        for(let i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    // Transpose the matrix
    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);
        for(let i = 0; i < matrix.rows; i++) {
            for(var j = 0; j < matrix.cols; j++) {
                result.data[j][i] = matrix.data[i][j];
            }
        }
        return result;
    }

    // Convert an array to a matrix and return it
    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    // Convert the matrix to an array and return it
    toArray() {
        let arr = [];
        for(let i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    // Randomize each value of the matrix
    randomize() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    // Print the matrix in a table format
    print() {
        console.table(this.data);
    }
}

