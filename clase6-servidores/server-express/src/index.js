const express = require(`express`);
const path = require(`path`);

const aplicacion = express();

const puerto = 8080;
let visitas = 0;

const servidor = aplicacion.listen(puerto, () => {
  console.log("server listo, puerto escuchado", puerto);
});

servidor.on("error", () => {
  console.log("hubo un error");
});

aplicacion.get("/", (request, response) => {
  visitas++;
  const filepath = path.resolve(__dirname, "../views/vista1.html");
  response.sendFile(filepath);
});
aplicacion.get("/visitas", (request, response) => {
  visitas++;
  response.json({
    mensaje: `esta es la visita numero ${visitas}`,
  });
});

aplicacion.get("/fyh", (request, response) => {
  visitas++;
  response.json({
    fyh: new Date(),
  });
});

//envio html basico usando expree

aplicacion.get("/mihtml", (request, resolve) => {
  const filepath = path.resolve(__dirname, "../views/vista1.html");
  const filepathNotabsolute = "../views/vista1.html";
  resolve.sendFile(filepath);
});
