const express = require("express");
const mainRouter = require("./routes/index");

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

app.use("/api", mainRouter);
