function curry(fn) {
  return function curring(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curring.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}

function isValid(value) {
  return !(typeof value !== 'number' || !isFinite(value));
}

class Calculator {
  constructor(numX, numY) {
    if (!isValid(numX) || !isValid(numY)) {
      throw new Error();
    }
    this.numX = numX;
    this.numY = numY;
  };

  setX = (num) => {
    if (!isValid(num)) {
      throw new Error();
    }
    this.numX = num;
  };
  setY = (num) => {
    if (!isValid(num)) {
      throw new Error();
    }
    this.numY = num;
  };

  getSum = () => this.numX + this.numY;
  getMul = () => this.numX * this.numY;
  getSub = () => this.numX - this.numY;
  getDiv = () => {
    if (this.numY === 0) {
      throw new Error();
    }
    return this.numX / this.numY;
  };
}
