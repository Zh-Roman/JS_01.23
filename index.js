document.addEventListener('click', documentActions);

const calculationValue = document.querySelector('.calculation');
const outputValue = document.querySelector('.output');

let calculation;
let passingResult;
let lastOperation;
let backspaceBan;

function proceedCalc(expression) {
  let numberX,
      operation,
      numberY,
      nextOperation,
      lowPriorityOperations = [];
  const transformedExpr = expression.split(' ').map(item => isNaN(+item) ? item : +item);

  function calc(arr) {
    numberX = arr[0];
    operation = arr[1];
    numberY = arr[2];
    if (arr.length === 3) {
      switch (operation) {
        case '+':
          return numberX + numberY;
        case '-':
          return numberX - numberY;
        case '*':
          return numberX * numberY;
        case '/':
          return numberX / numberY;
      }
    }
    nextOperation = arr[3];
    if ((nextOperation === '*' || nextOperation === '/') && (operation === '+' || operation === '-')) {
      lowPriorityOperations[0] = numberX;
      lowPriorityOperations[1] = operation;
      arr.splice(0, 2);
      let newY = calc([...arr]);
      if (Array.isArray(newY)) {
        return calc([...lowPriorityOperations, ...newY]);
      } else {
        return calc([...lowPriorityOperations, newY]);
      }
    } else {
      if ((nextOperation === '+' || nextOperation === '-') && (operation === '*' || operation === '/')) {
        arr.splice(0, 4);
        const newX = calc([numberX, operation, numberY]);
        return [newX, nextOperation, ...arr];
      }
      arr.splice(0, 4);
      const newX = calc([numberX, operation, numberY]);
      return calc([newX, nextOperation, ...arr]);
    }
  }

  let result = calc(transformedExpr);
  if (Array.isArray(result)) {
    result = calc(result);
  }
  if (Number.isInteger(result) && result.toString().length > 12) {
    return result.toExponential(4);
  }
  if (!Number.isInteger(result)) {
    if (Math.trunc(result).toString().length > 19) {
      return result.toExponential(4);
    }
    if (result.toString().length > 10) {
      let integerPartLength = Math.trunc(result).toString().length;
      if (integerPartLength > 10) {
        integerPartLength = 10;
      }
      if (integerPartLength <= 2) {
        return +result.toFixed(8);
      }
      return +result.toFixed(10 - integerPartLength);
    }
  }
  return result;
}

function resetCalc() {
  if (document.querySelector('._active')) {
    document.querySelector('._active').classList.remove('_active');
  }
  backspaceBan = undefined;
  lastOperation = undefined;
  calculation = undefined;
  passingResult = undefined;
  calculationValue.innerHTML = '';
  outputValue.innerHTML = '0';
}

function closeBrackets() {
  const lastOpenBracketIndex = calculation.lastIndexOf('(');
  const openBracket = calculation.split(' ').filter(item => item !== '(');
  if (openBracket.length === 1) {
    calculation = openBracket.join('');
    calculationValue.innerHTML = calculation;
    return;
  }
  const bracketsExpr = calculation.slice(lastOpenBracketIndex + 2);
  if (bracketsExpr.split(' ').length <= 2) {
    return;
  }
  const bracketsResult = proceedCalc(bracketsExpr);
  if (!Number.isFinite(bracketsResult)) {
    resetCalc();
    outputValue.innerHTML = 'Zero division is impossible';
    return;
  }
  calculation = calculation.replace(calculation.slice(lastOpenBracketIndex), bracketsResult);
  calculationValue.innerHTML = calculation;
}

function documentActions(e) {

  const targetElement = e.target;
  if (targetElement.closest('[data-reset]')) {
    return resetCalc();
  }
  if (targetElement.closest('[data-backspace]')) {
    if (calculation) {
      if (document.querySelector('._active')) {
        document.querySelector('._active').classList.remove('_active');
      }
      const value = calculation.split('');
      if (calculation.length === 1 || +calculation === backspaceBan || passingResult || passingResult === 0) {
        return resetCalc();
      }
      if (value[value.length - 1] === ' ' || value[value.length - 2] === ' ') {
        value.length = value.length - 2;
        calculation = value.join('');
        calculationValue.innerHTML = calculation;
        return;
      }
      value.length = value.length - 1;
      calculation = value.join('');
      calculationValue.innerHTML = calculation;
      return;
    }
  }
  if (targetElement.closest('[data-equal]')) {
    if (document.querySelector('._active')) {
      document.querySelector('._active').classList.remove('_active');
    }
    if (calculation?.split(' ').reverse().find(item => item === '(')) {
      if (calculation.length === 1) {
        return;
      }
      return closeBrackets();
    }
    if (calculation && isNaN(+calculation[calculation.length - 1]) && calculation[calculation.length - 1] !== '.') {
      const lastNumber = calculation.split(' ').reverse().find(item => !isNaN(+item));
      calculation += ` ${lastNumber}`;
      calculationValue.innerHTML = calculation;
      passingResult = proceedCalc(calculation);
      if (!Number.isFinite(passingResult)) {
        resetCalc();
        outputValue.innerHTML = 'Zero division is impossible';
        return;
      }
      outputValue.innerHTML = passingResult;
      lastOperation = calculation.split(' ').splice(-2, 2).join(' ');
      return;
    }
    if ((!calculation && !passingResult) || calculation?.split(' ').length === 1) {
      return;
    }
    if (lastOperation) {
      lastOperation = calculation.split(' ').splice(-2, 2).join(' ');
      calculation = `${passingResult} ${lastOperation}`;
      calculationValue.innerHTML = calculation;
      passingResult = proceedCalc(calculation);
      outputValue.innerHTML = passingResult;
      return;
    }
    passingResult = proceedCalc(calculation);
    if (!Number.isFinite(+passingResult)) {
      resetCalc();
      outputValue.innerHTML = 'Zero division is impossible';
      return;
    }
    outputValue.innerHTML = passingResult;
    lastOperation = calculation.split(' ').splice(-2, 2).join(' ');
    return;
  }
  if (targetElement.closest('[data-number]')) {
    if (!calculationValue.innerHTML) {
      if (targetElement.dataset.number === '0' || targetElement.dataset.number === '00') {
        return;
      }
      calculation = `${targetElement.dataset.number}`;
      calculationValue.innerHTML = calculation;
      outputValue.innerHTML = '=';
      return;
    }
    if (isNaN(+calculation[calculation.length - 1]) && calculation[calculation.length - 1] !== '.') {
      lastOperation = undefined;
      passingResult = undefined;
      if (document.querySelector('._active')) {
        document.querySelector('._active').classList.remove('_active');
      }
      if (targetElement.dataset.number === '00') {
        return;
      }
      calculation += ` ${targetElement.dataset.number}`;
      calculationValue.innerHTML = calculation;
      return;
    }

    const value = calculation.split(' ');
    if (value[value.length - 1] === '0') {
      if (targetElement.dataset.number === '0' || targetElement.dataset.number === '00') {
        return;
      }
      value.length = value.length - 1;
      calculation = `${value.join(' ')} ${targetElement.dataset.number}`;
      calculationValue.innerHTML = calculation;
      return;
    }
    if (value[value.length - 1].length >= 10) {
      return;
    }
    if (passingResult || passingResult === 0) {
      lastOperation = undefined;
      passingResult = undefined;
      calculation = `${targetElement.dataset.number}`;
      calculationValue.innerHTML = calculation;
      outputValue.innerHTML = '=';
      return;
    }
    calculation += `${targetElement.dataset.number}`;
    calculationValue.innerHTML = calculation;
    return;
  }
  if (targetElement.closest('[data-operation]')) {
    if (!calculationValue.innerHTML) {
      targetElement.classList.add('_active');
      calculation = `0 ${targetElement.dataset.operation}`;
      calculationValue.innerHTML = calculation;
      outputValue.innerHTML = '=';
      return;
    }

    if (isNaN(+calculation[calculation.length - 1]) && calculation[calculation.length - 1] !== '.') {
      if (document.querySelector('._active')) {
        document.querySelector('._active').classList.remove('_active');
      }
      if (calculation[calculation.length - 1] === '(') {
        return;
      }
      targetElement.classList.add('_active');
      const value = calculation.split('');
      value.length = value.length - 1;
      calculation = `${value.join('')}${targetElement.dataset.operation}`;
      calculationValue.innerHTML = calculation;
      return;
    }

    if (calculation.split(' ').reverse().find(item => isNaN(+item))) {
      if (calculation.split(' ').reverse().find(item => item === '(')) {
        targetElement.classList.add('_active');
        calculation += ` ${targetElement.dataset.operation}`;
        calculationValue.innerHTML = calculation;
        return;
      }
      const passedResult = proceedCalc(calculation);
      if (passedResult === Infinity || passedResult === -Infinity) {
        resetCalc();
        outputValue.innerHTML = 'Zero division is impossible';
        return;
      }
      if (((targetElement.dataset.operation === '-' || targetElement.dataset.operation === '+') && calculation.length > 20)
          || calculation.length > 40) {
        calculation = passedResult;
      }
      if ((targetElement.dataset.operation === '*' || targetElement.dataset.operation === '/') && calculation.length > 20) {
        const lastSign = calculation.split(' ').reverse().find(item => isNaN(+item));
        if (lastSign === '+' || lastSign === '-') {
          calculation = passedResult;
        }
      }
      backspaceBan = passedResult;
      outputValue.innerHTML = passedResult;
    }
    if (passingResult || passingResult === 0) {
      targetElement.classList.add('_active');
      calculation = `${passingResult} ${targetElement.dataset.operation}`;
      calculationValue.innerHTML = calculation;
      return;
    }
    targetElement.classList.add('_active');
    calculation += ` ${targetElement.dataset.operation}`;
    calculationValue.innerHTML = calculation;
    return;
  }
  if (targetElement.closest('[data-float]')) {
    if (!calculationValue.innerHTML) {
      calculation = `0${targetElement.dataset.float}`;
      calculationValue.innerHTML = calculation;
      outputValue.innerHTML = '=';
      return;
    }
    if (isNaN(+calculation[calculation.length - 1]) && calculation[calculation.length - 1] !== '.') {
      calculation += ` 0${targetElement.dataset.float}`;
      calculationValue.innerHTML = calculation;
      return;
    }
    if (calculation.split(' ')[calculation.split(' ').length - 1].split('').find(item => item === '.')
        || calculation[calculation.length - 1] === '.') {
      return;
    }
    if (passingResult || lastOperation) {
      return;
    }
    calculation += targetElement.dataset.float;
    calculationValue.innerHTML = calculation;
    return;
  }
  if (targetElement.closest('[data-opposite]')) {
    if (!calculationValue.innerHTML || isNaN(+calculation[calculation.length - 1])) {
      return;
    }
    const oppositeNumber = +calculation.split(' ')[calculation.split(' ').length - 1] * -1;
    const newCalculation = calculation.split(' ');
    newCalculation.splice(-1, 1, oppositeNumber);
    calculation = newCalculation.join(' ');
    calculationValue.innerHTML = calculation;
    return;
  }
  if (targetElement.closest('[data-brackets]')) {
    if (!calculationValue.innerHTML) {
      calculation = `${targetElement.dataset.brackets[0]}`;
      calculationValue.innerHTML = calculation;
      outputValue.innerHTML = '=';
      return;
    }
    if (isNaN(+calculation[calculation.length - 1]) && calculation[calculation.length - 1] !== '.') {
      calculation += ` ${targetElement.dataset.brackets[0]}`;
      calculationValue.innerHTML = calculation;
      return;
    }
    if (calculation.split(' ').reverse().find(item => item === '(')) {
      return closeBrackets();
    }
  }
}
