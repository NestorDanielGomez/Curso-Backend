const express = require("express");
const mainRouter = require("./routes/index");
const path = require("path");

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

app.get("/hello", (req, res) => {
  res.render("hello", { mensaje: "BIENVENIDOS HUMANOS" }); // Se muestra la plantilla hello.pug
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use("/api", mainRouter);
