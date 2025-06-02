let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('#clear');
const decimalButton = document.querySelector('.decimal');

numberButtons.forEach(btn =>
  btn.addEventListener('click', () => appendNumber(btn.textContent))
);
operatorButtons.forEach(btn =>
  btn.addEventListener('click', () => setOperator(btn.dataset.operator))
);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendDecimal);

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) resetScreen();
  display.textContent += number;
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  display.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === '/' && display.textContent === '0') {
    display.textContent = "Nice try 🙃";
    return;
  }
  secondOperand = display.textContent;
  display.textContent = roundResult(
    operate(currentOperator, firstOperand, secondOperand)
  );
  currentOperator = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? null : a / b;
    default:
      return null;
  }
}
