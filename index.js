Array.prototype.customFilter = function (callback, obj) {
  const outputArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.apply(obj, [this[i], i, this])) {
      outputArr.push(this[i]);
    }
  }
  return outputArr;
};

function createDebounceFunction(fn, delay) {
  let timeDelay;
  return function (...args) {
    clearTimeout(timeDelay);
    timeDelay = setTimeout(() => fn(...args), delay);
  };
}
