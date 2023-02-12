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

class RickAndMorty {
  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api';
  }

  getCharacter(characterId) {
    const requestUrl = `${this.baseUrl}/character/${characterId}`;
    if (!Number.isInteger(characterId) || characterId <= 0) {
      throw new Error();
    }
    return fetch(requestUrl)
        .then(response => {
          return response.ok ? response.json() : null;
        })
        .catch((e) => {
          throw new Error(e);
        });
  };

  async getEpisode(episodeId) {
    const requestUrl = `${this.baseUrl}/episode/${episodeId}`;
    if (!Number.isInteger(episodeId) || episodeId <= 0) {
      throw new Error();
    }
    try {
      const response = await fetch(requestUrl);
      return response.ok ? await response.json() : null;
    } catch (e) {
      throw new Error(e);
    }
  };
}
