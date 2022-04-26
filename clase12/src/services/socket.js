const socketIo = require("socket.io");
const { formatMessages } = require("../utils/messages");
const { getCurrentUser } = require("../utils/users");

const { ProductosController } = require("../controller/productos");
const messages = [
  { author: "ususario1", text: "¡Hola! ¿Que tal?" },
  { author: "ususario2", text: "¡Muy bien! ¿Y vos?" },
  { author: "ususario3", text: "¡Genial!" },
];

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("Nueva Conexion establecida desde socket!");
    console.log(new Date());

    socket.on("allProducts", async () => {
      const productos = await ProductosController.getAll();

      productos.forEach((unProducto) => {
        socket.emit("producto", unProducto);
      });
    });

    //Listen for chat messages

    socket.emit("messages", messages);
    socket.on("new-message", (data) => {
      messages.push(data);
      io.sockets.emit("messages", messages);
    });
  });

  return io;
};

const socketEmit = (eventName, message) => {
  io.emit(eventName, message);
};

module.exports = {
  initWsServer,
  socketEmit,
};
