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
