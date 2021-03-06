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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use("/api", mainRouter);
