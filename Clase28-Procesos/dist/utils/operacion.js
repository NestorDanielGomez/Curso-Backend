"use strict";

//funcion numeros aleatorios
var calcularNumeros = function calcularNumeros(cant) {
  var between = function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var limiteInferior = 1;
  var limiteSuperior = 1000;
  var salida = {};

  for (var i = 0; i < cant; i++) {
    var valor = between(limiteInferior, limiteSuperior);
    if (salida[valor]) salida[valor] = salida[valor] + 1;else salida[valor] = 1;
  }

  return salida;
};

process.on('message', function (msg) {
  var sum;

  if (msg) {
    var cant = msg;
    sum = calcularNumeros(cant);
  }

  process.send(sum);
});