import express from "express";
import mainRouter from "../routes/index";
import http from "http";
import * as socketio from "socket.io";
import { addMessageTotable } from "../services/database";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(`/api`, mainRouter);

const server = new http.Server(app);
const myWSServer = new socketio.Server(server);
export default server;

myWSServer.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(`El cliente ${socket.client} me acaba de mandar un dato`);
    console.log(data);
    addMessageTotable(data);
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
