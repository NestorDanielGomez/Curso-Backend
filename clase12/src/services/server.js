const express = require("express");
const http = require("http");
const path = require("path");
const mainRouter = require("../routes");
const { ProductosController } = require("../controller/productos");
const { initWsServer } = require("./socket");
const app = express();

const myHttpServer = http.Server(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conseguimos el path absoluto de la carpeta layouts

app.set("view engine", "pug");
const viewsPath = path.resolve(__dirname, "../../views");

app.set("views", viewsPath);

initWsServer(myHttpServer);

app.get("/", async (req, res) => {
  const data = await ProductosController.getAll();

  res.render("principal", { data });
});

app.use("/api", mainRouter);

module.exports = myHttpServer;
