const express = require("express");
const mainRouter = require("./routes/index");
const path = require("path");
const { Contenedor } = require("./contenedor");
const app = express();
const puerto = 8080;

const server = app.listen(puerto, () =>
  console.log("desafio entregable 8, escuchando puerto:", puerto)
);
server.on("error", (err) => {
  console.log("ERROR ATAJADO", err);
});

app.set("view engine", "pug");
const viewsPath = path.resolve(__dirname, "../views");
app.set("views", viewsPath);

app.get("/", async (req, res) => {
  const data = await Contenedor.getAll();
  console.log(data);
  res.render("principal", { data });
});

app.get("/productos", async (req, res) => {
  const data = await Contenedor.getAll();
  console.log(data);
  res.render("listado", { data });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use("/productos", mainRouter);
