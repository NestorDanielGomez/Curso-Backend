const http = require("http");

const obtenerMensaje = () => {
  const fyh = new Date();
  const hora = fyh.getHours();

  let mensaje = "buenos dias";
  if (hora >= 13 && hora <= 18) mensaje = "buenas tardes";
  if (hora >= 20 || hora <= 5) mensaje = "buenas noches";
  return mensaje;
};

const f = (peticion, respuesta) => {
  const fecha = new Date();
  const mensaje = obtenerMensaje();
  respuesta.end(mensaje);
};

const server = http.createServer(f);

const puerto = 8080;

const connectedServer = server.listen(puerto, () => {
  console.log(`Servidor Http escuchando en el puerto`, puerto);
});

console.log("hola");

//https://www.tutorialspoint.com/javascript/date_gethours.htm
