Array.prototype.customFilter = function (callback, obj) {
  const outputArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.apply(obj, [this[i], i, this])) {
      outputArr.push(this[i]);
    }
  }
  return outputArr;
};
