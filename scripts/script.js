function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function percentage(total, percentage) {
  switch (expression.operator) {
    case "+":
    case "−":
      return total * percentage / 100;
    case "×":
    case "÷":
      return percentage / 100;
  }
}

function operate(x, y, operator) {
  if (y.includes("%")) {
    percent = Number.isInteger(y) ? parseInt(y) : parseFloat(y);
    y = percentage(x, percent);
  }

  x = Number.isInteger(x) ? parseInt(x) : parseFloat(x);
  y = Number.isInteger(y) ? parseInt(y) : parseFloat(y);
  let result;

  switch (operator) {
    case "+":
      result = add(x, y);
      break;
    case "−":
      result = subtract(x, y);
      break;
    case "×":
      result = multiply(x, y);
      break;
    case "÷":
      result = divide(x, y);
      break;
  }

  return result;
}

function numberInput(btn) {
  const constant = btn;
  if (expression.wasOperatorLast) {
    screen.textContent = "";
    expression.wasOperatorLast = false;
  }

  if (constant == "." && screen.textContent.includes(".")) {
    return;
  } else if (
    screen.textContent.length == 1 &&
    screen.textContent == "0" &&
    constant != "."
  ) {
    screen.textContent = "";
  }

  if ((constant == "%" && screen.textContent.includes("%")) || (constant == "%" && screen.textContent.length == 0)) {
    return;
  }

  if (screen.textContent.length < 9 && !screen.textContent.includes("%")) {
    if (constant == "." && screen.textContent.length == 0) {
      screen.textContent = "0";
    }

    screen.textContent += n;
  }
}

function assignNumberButton(btn) {
  btn.addEventListener("click", (b) => numberInput((b.target).innerText));
}

function addToExpression(operator) {
  const input = screen.textContent;

  if (operator == "Enter") {
    operator = "=";
  }
  
  if (expression.wasOperatorLast) {
    expression.operator = operator;
    return;
  } else {
    expression.wasOperatorLast = true;
  }

  if (!expression.total) {
    expression.total = input;
    expression.operator = operator;
    return;
  }

  expression.constant = input;
  expression.total = operate(expression.total, expression.constant, expression.operator);
  expression.operator = operator;

  if (operator == "=") {
    screen.textContent = `${expression.total}`;
  }
}

function assignOperator(btn) {
  btn.addEventListener("click", (b) => addToExpression((b.target).innerText));
}

function clearHistory() {
  for (let key in expression) {
    delete expression[`${key}`];
  }

  screen.textContent = "0";
}

const screen = document.querySelector("#main-screen");

const numberButtons = [
  document.querySelector("#btn-nine"),
  document.querySelector("#btn-eight"),
  document.querySelector("#btn-seven"),
  document.querySelector("#btn-six"),
  document.querySelector("#btn-five"),
  document.querySelector("#btn-four"),
  document.querySelector("#btn-three"),
  document.querySelector("#btn-two"),
  document.querySelector("#btn-one"),
  document.querySelector("#btn-zero"),
  document.querySelector("#btn-decimal"),
  document.querySelector("#btn-percent"),
];

numberButtons.forEach(assignNumberButton);

const operators = [  
  document.querySelector("#btn-divide"),
  document.querySelector("#btn-multply"),
  document.querySelector("#btn-subtract"),
  document.querySelector("#btn-add"),
  document.querySelector("#btn-equals"),
];

operators.forEach(assignOperator);

const clearGlobal = document.querySelector("#btn-clear-global");
const clearEntry = document.querySelector("#btn-clear-entry");

clearGlobal.addEventListener("click", clearHistory);
clearEntry.addEventListener("click", () => (screen.textContent = ""));

const expression = {};