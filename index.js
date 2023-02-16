class Stack {

  constructor(limitValue = 10) {
    if (!Number.isInteger(limitValue) || limitValue < 0) {
      throw new Error('Invalid limit value');
    }
    this.limitValue = limitValue;
    this.lastElemIndex = 0;
    this.stackStorage = [];
  };

  push = (elem) => {
    if (this.lastElemIndex === this.limitValue) {
      throw new Error('Limit exceeded');
    }
    this.stackStorage[this.lastElemIndex] = elem;
    this.lastElemIndex++;
  };

  pop = () => {
    if (!this.lastElemIndex) {
      throw new Error('Empty stack');
    }
    this.lastElemIndex--;
    const poppedElem = this.stackStorage[this.lastElemIndex];
    this.stackStorage.length = this.lastElemIndex;
    return poppedElem;
  };

  peek = () => !this.lastElemIndex ? null : this.stackStorage[this.lastElemIndex - 1];

  isEmpty = () => !this.lastElemIndex;

  toArray = () => !this.lastElemIndex ? [] : [...this.stackStorage];

  static fromIterable = (iterable) => {
    if (!iterable[Symbol.iterator]) {
      throw new Error('Not iterable');
    }
    const outputStack = new this(iterable.size ?? iterable.length);
    if (iterable instanceof Map) {
      for (let elem of iterable.values()) {
        outputStack.push(elem);
      }
    } else {
      for (let elem of iterable) {
        outputStack.push(elem);
      }
    }
    return outputStack;
  };
}
