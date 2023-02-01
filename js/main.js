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
