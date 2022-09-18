let tecla = "";
let tela = document.getElementById("telaDig");
let conta = "";
let ultimaTecla = "";
let operador = 0;


document.ready = function () {
  addEventListener("keydown", pressButton());
};

function pressButton(event, clickEvent) {
  let evento;

  if (event == "") {
    evento = clickEvent;
  } else {
    evento = event.key;
  }

  eraseKey(evento);

  if (evento != ultimaTecla) {
    ultimaTecla = evento;
  }

  if (evento == "c" || evento == "C" || evento == 'Delete') {
    tecla = document.getElementById("tC");
    teclaApertada();
    tela.value = "";
  } else if (evento == "Enter") {
    tecla = document.getElementById("tEnter");
    teclaApertada();
    conta = tela.value;
    tela.value = calcular(conta);
  } else {
    if ("/*-+.".indexOf(evento) != -1 && tela.value.length == 0) {
    } else {
      if (
        evento == "1" ||
        evento == "2" ||
        evento == "3" ||
        evento == "4" ||
        evento == "5" ||
        evento == "6" ||
        evento == "7" ||
        evento == "8" ||
        evento == "9" ||
        evento == "0" ||
        evento == "/" ||
        evento == "*" ||
        evento == "-" ||
        evento == "+" ||
        evento == "." ||
        evento == "00"
      ) {
        if (evento == ".") {
          tecla = document.getElementById("dot");
        } else {
          tecla = document.getElementById("t" + evento);
        }

        ultimaTecla = evento;

        if (verificaTecla(evento, tela.value.slice(-1))) {
          if (eraseKey(evento)) conta = tecla.innerText;

          if (tela.value == "" || tela.value.length <= 12) {
            tela.value += conta;
          }

          teclaApertada();
        }
      }
    }
  }
}

function calcular(s) {
  let total = 0;
  s = s.match(/[+\-\*\/]*(\.\d+|\d+(\.\d+)?)/g) || [];

  while (s.length) {
    const nv = s.shift();
    if (nv.startsWith("/")) {
      total /= parseFloat(nv.substring(1));
    } else if (nv.startsWith("*")) {
      total *= parseFloat(nv.substring(1));
    } else {
      total += parseFloat(nv);
    }
  }
  return total;
}

function eraseKey(presskey) {
  if (presskey == "Backspace") {
    tecla = document.getElementById("tBackspace");
    teclaApertada();
    tela.value = tela.value.slice(0, -1);
    return false;
  }
  return true;
}

function teclaApertada() {
  tecla.classList.add("click");

  setTimeout(function () {
    tecla.classList.remove("click");
  }, 150);
}

function verificaTecla(pressKey, lastKey) {
  if (lastKey == "") return true;

  if (isNaN(pressKey) && "/*-+.".indexOf(lastKey) != -1) return false;

  if (pressKey == lastKey && "/*-+.".indexOf(lastKey) != -1) {
    return false;
  } else {
    return true;
  }
}
