const express = require("express");
const path = require("path");
const http = require("http");
const { initWsServer } = require("./services/socket");
const mainRouter = require("./routes");

//Configuro el server
const app = express();
const server = http.Server(app);

//inicio servidor SocketIo
initWsServer(server);

app.use("/api", mainRouter);
// listening to port...
const port = 8080;
server.listen(port, () =>
  console.log(`Servidor corriendo en el puerto: ${port}`)
);

// define the paths to the static files
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
