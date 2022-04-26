const express = require("express");
const http = require("http");
const path = require("path");
const mainRouter = require("../routes");
const { engine } = require("express-handlebars");
const { initWsServer } = require("./socket");

const app = express();

const myHttpServer = http.Server(app);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conseguimos el path absoluto de la carpeta layouts
const layoutDirPath = path.resolve(__dirname, "../../views/layouts");
//Conseguimos el path absoluto del esqueleto de nuestro HTML (layouts/index.hbs)
const defaultLayerPth = path.resolve(
  __dirname,
  "../../views/layouts/index.hbs"
);
const partialDirPath = path.resolve(__dirname, "../../views/partials");

//Conseguimos el path absoluto de la carpeta layouts

app.set("view engine", "hbs");
const viewsPath = path.resolve(__dirname, "../../views");

app.set("views", viewsPath);

app.engine(
  "hbs",
  engine({
    layoutsDir: layoutDirPath, //le decimos donde esta la carpeta de layouts
    extname: "hbs", //indicamos la extension de los archivos (por defecto es .handlebars y es muy largo)
    defaultLayout: defaultLayerPth, //indicamos cual es el layout por defecto que usara,
    partialsDir: partialDirPath,
  })
);

initWsServer(myHttpServer);

app.get("/", async (req, res) => {
  res.render("main");
});

app.use("/api", mainRouter);

module.exports = myHttpServer;
