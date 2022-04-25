const express = require(`express`);
const path = require(`path`);
const http = require(`http`);
const { initWsServer } = require("./services/socket");
const mainRouter = require(`./routes`);

//configuracion basica
const app = express();
const miServer = http.Server(app);

//inicio servidor socketIO
initWsServer(miServer);

//escucho mi servidor
const PORT = 8080 || process.env.PORT;
miServer.listen(PORT, () => {
  console.log(`escuchando en el puerto: ${PORT}`);
});

//defino ruta a los archivos estaticos
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use(`/api`, mainRouter);
