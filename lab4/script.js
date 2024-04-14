"use strict";

const buttonResult = document.querySelector(".res");
const getA = document.getElementById("a");
const getB = document.getElementById("b");
const getE = document.getElementById("E");
const textResult = document.querySelector(".result h1 b");
const diagram = document.querySelector("#diagram");
const diagram2 = document.querySelector("#diagram2");
const diagrams = document.querySelectorAll(".canvas");
const cleanButton = document.querySelector(".clean");

buttonResult.addEventListener("click", function () {
  cleanButton.style.display = "block";
  diagrams.forEach((element) => {
    element.style.display = "block";
  });
  const a = Number(getA.value);
  const b = Number(getB.value);
  const E = Number(getE.value);

  if (isNaN(a) || isNaN(b) || isNaN(E)) {
    alert("Заповніть всі поля коректними значеннями");
    return;
  }
  buttonResult.disabled = true;

  const roots = [];

  if (a <= 0 && b >= 0) {
    roots.push(0);
  }

  let x0 = a;
  let x1 = a + E;
  while (x0 < b) {
    if (myFunction(x0) * myFunction(x1) <= 0) {
      const root = methodHord(x0, x1, E);
      if (root !== null) {
        roots.push(root);
      }
    }
    x0 = x1;
    x1 += E;
  }

  const arrayX = Array.from({ length: 20 }, (_, i) => i * 0.5);
  const arrayY = arrayX.map((x) => myFunction(x));
  const arrayXForCanvas = Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const arrayYForCanvas = arrayXForCanvas.map((x) => myFunction(x));
  const ctx = diagram.getContext("2d");
  const ctx2 = diagram2.getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: arrayX,
      datasets: [
        {
          label: "x^2 - 20sin(x)",
          data: arrayY,
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`,
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            color: (context) =>
              context.tick.value === 0 ? "red" : "rgba(0, 0, 0, 0.1)",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: (context) =>
              context.tick.value === 0 ? "red" : "rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
  new Chart(ctx2, {
    type: "line",
    data: {
      labels: arrayXForCanvas,
      datasets: [
        {
          label: `x^2 - 20sin(x) в діапазоні [${a}, ${b}]`,
          data: arrayYForCanvas,
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`,
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            color: (context) =>
              context.tick.value === 0 ? "red" : "rgba(0, 0, 0, 0.1)",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: (context) =>
              context.tick.value === 0 ? "red" : "rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });

  textResult.textContent = roots.join(", ");
});

const methodHord = function (a, b, E) {
  let x0 = a;
  let x1 = b;
  let f0 = myFunction(x0);
  let f1 = myFunction(x1);

  if (f0 * f1 > 0) {
    return null;
  }

  while (Math.abs(x1 - x0) > E) {
    const x2 = (x0 * f1 - x1 * f0) / (f1 - f0);
    const f2 = myFunction(x2);
    if (Math.abs(f2) < E) {
      return x2;
    }

    if (f0 * f2 < 0) {
      x1 = x2;
      f1 = f2;
    } else {
      x0 = x2;
      f0 = f2;
    }
  }

  return null;
};

const myFunction = function (x) {
  return Math.pow(x, 2) - 20 * Math.sin(x);
};

cleanButton.addEventListener("click", function () {
  window.location.reload();
});
