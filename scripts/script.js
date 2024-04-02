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
  const n = btn.innerText;

  if (n == "." && screen.textContent.includes(".")) {
    return;
  } else if (
    screen.textContent.length == 1 &&
    screen.textContent == "0" &&
    n != "."
  ) {
    screen.textContent = "";
  }

  if (screen.textContent.length < 9) {
    if (n == "." && screen.textContent.length == 0) {
      screen.textContent = "0";
    }

    screen.textContent += n;
  }
}

function assignNumberButton(btn) {
  btn.addEventListener("click", (b) => numberInput(b.target));
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

const clearGlobal = document.querySelector("#btn-clear-global");
const clearEntry = document.querySelector("#btn-clear-entry");

clearEntry.addEventListener("click", () => (screen.textContent = ""));