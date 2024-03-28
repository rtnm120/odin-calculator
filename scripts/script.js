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

function operate(x, y, operator) {
  let result;

  switch (operator) {
    case "+":
      result = add(x, y);
      break;
    case "-":
      result = subtract(x, y);
      break;
    case "*":
      result = multiply(x, y);
      break;
    case "/":
      result = divide(x, y);
      break;
  }

  return result;
}

function assignNumberButton(btn) {
  btn.addEventListener("click", (b) => numberInput(b.target));
}

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
];

numberButtons.forEach(assignNumberButton);
