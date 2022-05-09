import express from "express";
import mainRouter from "../routes/index";
import http from "http";
import * as socketio from "socket.io";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(`/api`, mainRouter);

const server = new http.Server(app);
const myWSServer = new socketio.Server(server);
export default server;

const clients: any = [];

myWSServer.on("connection", (socket) => {
  console.log("Un cliente se ha conectado!");
  console.log("ID SOCKET SERVER", socket.id);
  console.log("ID SOCKET CLIENTE", socket.client.id);

  clients.push(socket.id);

  socket.on("message", (data) => {
    console.log(`El cliente ${socket.client.id} me acaba de mandar un dato`);
    console.log(data);

    // // SERVER RESPONDE Al CLIENTE QUE LE MANDO EL MENSJAE
    // socket.emit('response', data);

    //SERVER ENVIA MENSAJE A TODOS LOS CLIENTES SALVO AL CLIENTE QUE ENVIO EL MENSAJE
    socket.broadcast.emit("response", data);

    //SERVER LE ENVIA A TODOS LOS CLIENTES
    // myWSServer.emit('response', data)
  });
});

app.use(express.json());
app.post("/mensaje", (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje)
    return res.status(400).json({
      msg: "Mandame un mensaje",
    });

  //server envia de forman random a un cliente en particular

  res.json({
    msg: "SALUDOS HUMANOS",
  });
});
