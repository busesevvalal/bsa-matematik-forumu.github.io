var number1,
  number2,
  tru = 0,
  fals = 0,
  total,
  reply,
  opt;

number1 = document.getElementById("number1");
number2 = document.getElementById("number2");
opt = document.getElementById("opt");
total = document.getElementById("total");
reply = document.getElementById("reply");
tru = document.getElementById("tru");
fals = document.getElementById("fals");

Math.rand = function (down, up) {
  let number = Math.random();
  number = number * (up - down);
  number = Math.floor(number) + down;

  return number;
};

function newquestion() {
  let operation = ["+", "-", "*", "/"];
  opt.textContent = operation[Math.rand(0, 4)];

  number1.textContent = Math.rand(0, 50);
  number2.textContent = Math.rand(0, 50);
  if (opt.textContent == "/") {
    while (true) {
      number2.textContent = Math.rand(0, 50);
      if (number1.textContent % number2.textContent == 0) {
        break;
      }
    }
  }
}

window.onload = function () {
  newquestion();
};

reply.onclick = function () {
  let answer, n1, n2;
  n1 = Number(number1.textContent);
  n2 = Number(number2.textContent);
  switch (opt.textContent) {
    case "+":
      answer = n1 + n2;
      break;
    case "-":
      answer = n1 - n2;
      break;
    case "*":
      answer = n1 * n2;
      break;
    case "/":
      answer = n1 / n2;
      break;
    default:
      break;
  }

  if (total.value == answer) {
    tru.textContent = Number(tru.textContent) + 1;
  } else {
    fals.textContent = Number(fals.textContent) + 1;
  }
  total.value = "";
  newquestion();
};
