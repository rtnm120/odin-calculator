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
      if (y == 0) {
        screen.textContent = "GOOD TRY";
        result = x;
        break;
      }
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

    screen.textContent += constant;
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
    screenOutput(expression.total);
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

function keyInput(btn) {
  const key = btn.key;
  const numberList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "%"];
  const operatorList = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
    "=": "=",
    "Enter": "=",
  }

  if (numberList.includes(key)) {
    numberInput(key);
  } else if (operatorList.hasOwnProperty(key)) {
    addToExpression(operatorList[`${key}`]);
  } else if (key == "Backspace") {
    screen.textContent = "0";
  } else if (key == "Delete") {
    clearHistory();
  }
}

function screenOutput(total) {
  if (Number.isInteger(total) && total > 999999999) {
    screen.textContent = total.toPrecision(3);
  } else if (!Number.isInteger(total) && total.toString().length > 9 && total > 999999999) {
    screen.textContent = total.toPrecision(3);
  } else if (!Number.isInteger(total)) {
    screen.textContent = parseFloat(total.toPrecision(8)); 
  } else {
    screen.textContent = total;
  }
}


const screen = document.querySelector("#main-screen");
screen.textContent = "0";

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
clearEntry.addEventListener("click", () => (screen.textContent = "0"));

const expression = {};

window.addEventListener("keyup", b => keyInput(b));