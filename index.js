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

function validateStringValue(value, minValue, maxValue) {
  return (typeof value !== 'string' || value.length < minValue || value.length > maxValue);
}

function validateNumberValue(value, minValue, maxValue) {
  return (isNaN(value) || typeof value !== 'number' || value < minValue || value > maxValue);
}

function notEqualsZero(value) {
  return (!isFinite(value) || typeof value !== 'number' || value <= 0);
}

class Car {

  #brand = '';
  #model = '';
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  set brand(value) {
    if (validateStringValue(value, 1, 50)) {
      throw new Error('Invalid brand name');
    }
    this.#brand = value;
  };

  get brand() {
    return this.#brand;
  };

  set model(value) {
    if (validateStringValue(value, 1, 50)) {
      throw new Error('Invalid model name');
    }
    this.#model = value;
  };

  get model() {
    return this.#model;
  };

  set yearOfManufacturing(value) {
    if (validateNumberValue(value, 1950, new Date().getFullYear())) {
      throw new Error('Invalid year of manufacturing');
    }
    this.#yearOfManufacturing = value;
  };

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  };

  set maxSpeed(value) {
    if (validateNumberValue(value, 100, 330)) {
      throw new Error('Invalid max speed');
    }
    this.#maxSpeed = value;
  };

  get maxSpeed() {
    return this.#maxSpeed;
  };

  set maxFuelVolume(value) {
    if (validateNumberValue(value, 20, 100)) {
      throw new Error('Invalid max fuel volume');
    }
    this.#maxFuelVolume = value;
  };

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  };

  set fuelConsumption(value) {
    if (notEqualsZero(value)) {
      throw new Error('Invalid fuel consumption');
    }
    this.#fuelConsumption = value;
  };

  get fuelConsumption() {
    return this.#fuelConsumption;
  };

  set damage(value) {
    if (validateNumberValue(value, 1, 5)) {
      throw new Error('Invalid damage');
    }
    this.#damage = value;
  };

  get damage() {
    return this.#damage;
  };

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  };

  get isStarted() {
    return this.#isStarted;
  };

  get mileage() {
    return this.#mileage;
  };

  get health() {
    return this.#health;
  };

  start() {
    if (this.isStarted) {
      throw new Error('Car has already started');
    } else {
      this.#isStarted = true;
    }
  };

  shutDownEngine() {
    if (!this.isStarted) {
      throw new Error('Car hasn\'t started yet');
    } else {
      this.#isStarted = false;
    }
  };

  fillUpGasTank(fuelAmount) {
    if (notEqualsZero(fuelAmount)) {
      throw new Error('Invalid fuel amount');
    }
    if ((this.currentFuelVolume + fuelAmount) > this.maxFuelVolume) {
      throw new Error('Too much fuel');
    }
    if (this.isStarted) {
      throw new Error('You have to shut down your car first');
    }
    this.#currentFuelVolume += fuelAmount;
  };

  drive(speed, hours) {
    if (notEqualsZero(speed)) {
      throw new Error('Invalid speed');
    }
    if (notEqualsZero(hours)) {
      throw new Error('Invalid duration');
    }
    if (speed > this.maxSpeed) {
      throw new Error('Car can\'t go this fast');
    }
    if (!this.isStarted) {
      throw new Error('You have to start your car first');
    }
    const distance = speed * hours;
    const consumption = this.fuelConsumption * distance / 100;
    const damaging = this.damage * distance / 100;
    if (this.currentFuelVolume < consumption) {
      throw new Error('You don\'t have enough fuel');
    }
    if (this.health < damaging) {
      throw new Error('Your car won’t make it');
    }
    this.#currentFuelVolume -= consumption;
    this.#health -= damaging;
    this.#mileage += distance;
  };

  repair() {
    if (this.isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (this.currentFuelVolume !== this.maxFuelVolume) {
      throw new Error('You have to fill up your gas tank first');
    }
    this.#health = 100;
  };

  getFullAmount() {
    return (this.currentFuelVolume === this.maxFuelVolume) ? 0 : this.maxFuelVolume - this.currentFuelVolume;
  };
}
