const express = require("express");
const path = require("path");
const { Contenedor } = require("./contenedor");

const aplicacion = express();

const puerto = 8080;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

aplicacion.listen(puerto, () => {
  console.log("desafio entregable 6, escuchando puerto:", puerto);
});

aplicacion.get("/productos", async (request, response) => {
  const resultado = await Contenedor.getAll();
  response.json({
    data: resultado,
  });
});

aplicacion.get(`/productoRandom`, async (request, response) => {
  const resultado = await Contenedor.getAll();
  const soloIds = resultado.map((a) => a.id);
  const numeroRandom = randomNumber(0, soloIds.length);
  const idRandom = soloIds[numeroRandom];
  const productoRandom = await Contenedor.getById(idRandom);
  response.json({
    data: productoRandom,
  });
});
