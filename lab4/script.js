"use strict";

const buttonResult = document.querySelector(".res");
const getA = document.getElementById("a");
const getB = document.getElementById("b");
const getE = document.getElementById("E");
const textResult = document.querySelector(".result h1");

buttonResult.addEventListener("click", function () {
  const a = Number(getA.value);
  const b = Number(getB.value);
  const E = Number(getE.value);
  console.log(a, b, E);
  if (a === "" || b === "" || E === "o") {
    alert("Заповність всі поля");
    clear();
  }
  if (a * b < 0) {
    alert("Змінити А або Б");
    clear();
  } else {
    const result = countResult(a, b, E);
    textResult.textContent = result;
  }
});

const countResult = function (a, b, E) {
  if (myFunction(a) * secondDericvative(a) > 0) {
    let z = a;
    a = b;
    b = z;
  }
  let x = methodHord(a, b);
  while (Math.abs(x - a > E)) {
    a = x;
    x = methodHord(a, b);
  }
  return x;
};
const methodHord = function (a, b) {
  const x = a - (myFunction(a) * (b - a)) / (myFunction(b) - myFunction(a));
  return x;
};
const myFunction = function (x) {
  return Math.pow(x, 2) - 20 * Math.sin(x);
};
const firstDericvative = function (x) {
  return 2 * x - 20 * Math.cos(x);
};
const secondDericvative = function (x) {
  return 2 + 20 * Math.sin(x);
};
const clear = function () {
  getA.value = "";
  getB.value = "";
  getE.value = "o";
};
