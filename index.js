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
