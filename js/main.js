const numberInfo = () => {
  const enteredNumber = prompt('Enter a number');
  if (enteredNumber !== null) {
    if (+enteredNumber < 0 || !Number.isInteger(+enteredNumber)) {
      console.log('Incorrect input!');
      return numberInfo();
    } else {
      const delimiters = [];
      let factorial, i;
      for (i = 1, factorial = 1; i <= +enteredNumber; i++, factorial) {
        factorial *= i;
        if (+enteredNumber % i === 0) {
          delimiters.push(i);
        }
      }
      console.log(`Number: ${enteredNumber}\nFactorial:${factorial}\nSquare: ${Math.pow(+enteredNumber, 2)}\nisPrime: ${delimiters.length === 2}\nisEven: ${+enteredNumber % 2 === 0}\nDelimiters: ${delimiters.reverse()}`);
    }
  } else {
    return numberInfo();
  }
};
numberInfo();

const matrix = () => {
  const matrixElementsFn = () => {
    const matrixElements = prompt('Enter no more than 3 characters and no less than 1.');
    if (matrixElements !== null) {
      if (matrixElements.length < 1 ||
          matrixElements.length > 3 ||
          matrixElements.length !== matrixElements.trim().length) {
        console.log('Incorrect input!');
        return matrixElementsFn();
      } else {
        return matrixElements;
      }
    } else {
      return matrixElementsFn();
    }
  }
  const matrixDimensionFn = () => {
    const matrixDimension = prompt('Enter a positive number greater than 0 and less than 10.');
    if (matrixDimension !== null) {
      if (+matrixDimension < 1 ||
          +matrixDimension > 9 ||
          !Number.isInteger(+matrixDimension)) {
        console.log('Incorrect input!');
        return matrixDimensionFn();
      } else {
        return +matrixDimension;
      }
    } else {
      return matrixDimensionFn();
    }
  }
  const matrixElements = matrixElementsFn();
  const matrixDimension = matrixDimensionFn();
  console.log(`${Array(matrixDimension).fill(Array(matrixDimension).fill(matrixElements).join(' ')).join('\n')}`);
};
matrix();
