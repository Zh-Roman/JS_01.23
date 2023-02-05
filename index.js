function makeDeepCopy(obj) {
  const objectCopy = {};
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return deepArrayCopy(obj);
    }
    if (obj instanceof Set) {
      return deepSetCopy(obj);
    }
    if (obj instanceof Map) {
      return deepMapCopy(obj);
    }
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (obj[key] instanceof Map) {
          objectCopy[key] = deepMapCopy(obj[key]);
        } else if (obj[key] instanceof Set) {
          objectCopy[key] = deepSetCopy(obj[key]);
        } else if (Array.isArray(obj[key])) {
          objectCopy[key] = deepArrayCopy(obj[key]);
        } else {
          objectCopy[key] = makeDeepCopy(obj[key]);
        }
      } else {
        objectCopy[key] = obj[key];
      }
    }
  } else {
    throw new Error();
  }
  return objectCopy;
}

function deepArrayCopy(arr) {
  return arr.map((arrayValue) => {
    if (typeof arrayValue === 'object' && arrayValue !== null) {
      return makeDeepCopy(arrayValue);
    } else {
      return arrayValue;
    }
  });
}

function deepSetCopy(set) {
  return new Set(deepArrayCopy([...set]));
}

function deepMapCopy(map) {
  const newMap = new Map(map);
  for (let mapValue of map.entries()) {
    if (typeof mapValue[0] === 'object' && mapValue[0] !== null) {
      newMap.delete(mapValue[0]);
      newMap.set(makeDeepCopy(mapValue[0]), mapValue[1]);
    }
    if (typeof mapValue[1] === 'object' && mapValue[1] !== null) {
      newMap.set(mapValue[0], makeDeepCopy(mapValue[1]));
    }
  }
  return newMap;
}

function selectFromInterval(arr, firstValue, secondValue) {
  if (!Array.isArray(arr) || !arr || !arr.length || [...arguments].length < 3) {
    throw new Error();
  }
  arr.forEach(value => {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error();
    }
  });
  [...arguments].splice(1, 2).forEach((value) => {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error();
    }
  })

  let minValue = secondValue,
      maxValue = firstValue;
  if (firstValue < secondValue) {
    minValue = firstValue;
    maxValue = secondValue;
  }
  return arr.filter(number => number <= maxValue && number >= minValue);
}

function createIterable(fromValue, toValue) {
  if ([...arguments].length < 2 || arguments[1] <= arguments[0]) {
    throw new Error();
  }
  [...arguments].forEach((value) => {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      throw new Error();
    }
  })
  return {
    from: fromValue,
    to: toValue,

    [Symbol.iterator]() {
      this.currentValue = this.from;
      return this;
    },

    next() {
      if (this.currentValue <= this.to) {
        return {
          done: false,
          value: this.currentValue++,
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
}
