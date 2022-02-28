class Regression {

    n: number;

    xk: number;

    r: number;

    r2: number;

    b0: number;

    b1: number;

    yk: number;

    x: number[];

    y: number[];

    //.i
    constructor(xk: number, x: number[], y: number[]) {

        this.n = x.length;

        this.xk = xk;

        this.x = x;

        this.y = y;

        this.#calculateRAndR2();

        this.#calculateB0AndB1();

        this.#calculateNewRegression();
    }

    //.i
    #addAllValues = (prev: number, current:number) => prev + current;
    
    //.i
    #addAllSquaredValues = (prev: number, current: number) => prev + (current * current);

    //.i
    #productOfXY = (_: any, i: number) => this.x[i] * this.y[i];

    //.i
    #sumOfXY = () =>  Array.from({ length: this.n }, this.#productOfXY).reduce(this.#addAllValues, 0);

    //.i
    #calculateRAndR2 = () => {

        // sumatoria de x * y
        const sumOfXY = this.#sumOfXY();

        // sumatoria de x
        const sumOfX = this.x.reduce(this.#addAllValues, 0);

        // sumatoria de y
        const sumOfY = this.y.reduce(this.#addAllValues, 0);

        // sumatoria de x^2
        const sumOfX2 = this.x.reduce(this.#addAllSquaredValues, 0);

        // sumatoria de y^2
        const sumOfY2 = this.y.reduce(this.#addAllSquaredValues, 0);

        const numerator = (this.n * sumOfXY) - (sumOfX * sumOfY);

        const denominator = Math.sqrt(((this.n * sumOfX2) - (sumOfX * sumOfX)) * ((this.n * sumOfY2) - (sumOfY * sumOfY)))

        this.r = numerator / denominator;

        this.r2 = this.r * this.r;        
    }

    //.i
    #calculateB0AndB1 = () => {

        const sumOfXY = this.#sumOfXY();

        const avgX = this.x.reduce(this.#addAllValues, 0) / this.n;
        
        const avgY = this.y.reduce(this.#addAllValues, 0) / this.n;

        const sumOfX2 = this.x.reduce(this.#addAllSquaredValues, 0);

        const avgX2 = avgX * avgX;

        const numerator = (sumOfXY) - (this.n * avgX * avgY);

        const denominator = (sumOfX2) - (this.n * avgX2);

        this.b1 = numerator / denominator;

        this.b0 = avgY - this.b1 * avgX;
    }

    //.i
    #calculateNewRegression = () => {

        this.yk = (this.b0) + (this.b1 * this.xk);
    }

    //.i
    printResults = () => {

        console.log(`N\t= ${this.n}`);

        console.log(`xk\t= ${this.xk}`);

        console.log(`r\t= ${+this.r.toFixed(5)}`);

        console.log(`r2\t= ${this.r2.toFixed(5)}`);

        console.log(`b0\t= ${this.b0.toFixed(5)}`);

        console.log(`b1\t= ${this.b1.toFixed(5)}`);

        console.log(`yk\t= ${this.yk.toFixed(5)}`);
    }
}

export default Regression;