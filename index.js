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

class ListNode {

  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  };
}

class LinkedList {

  constructor() {
    this.storage = null;
    this.firstElem = null;
    this.lastElem = null;
  };

  append = (elem) => {
    const newElem = new ListNode(elem);
    if (!this.storage) {
      this.firstElem = newElem;
      this.lastElem = newElem;
      return this.storage = [newElem];
    }
    this.lastElem.next = newElem;
    this.lastElem = newElem;
    return this.storage = [...this.storage, newElem];
  };

  prepend = (elem) => {
    const newElem = new ListNode(elem, this.firstElem);
    if (!this.storage) {
      this.firstElem = newElem;
      this.lastElem = newElem;
      return this.storage = [newElem];
    }
    this.firstElem = newElem;
    return this.storage = [newElem, ...this.storage];
  };

  find = (elem) => {
    let currentElem = this.firstElem;
    const findElem = (currNode) => {
      if (!currNode) {
        return null;
      }
      if (currNode.value === elem) {
        return currNode;
      } else {
        return findElem(currNode.next);
      }
    };
    return findElem(currentElem);
  };

  toArray = () => !this.storage ? [] : [...this.storage];

  static fromIterable = (iterable) => {
    if (!iterable[Symbol.iterator]) {
      throw new Error('Not iterable');
    }
    const outputList = new this();
    if (iterable instanceof Map) {
      for (let elem of iterable.values()) {
        outputList.append(elem);
      }
    } else {
      for (let elem of iterable) {
        outputList.append(elem);
      }
    }
    return outputList;
  };
}
