"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../config/index"));

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("../routes"));

var _randomRouter = _interopRequireDefault(require("../routes/randomRouter.js"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _auth = require("./auth");

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); //Inicializar express-session

var ttlSeconds = 600;
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: _index["default"].MONGO_ATLAS_URL // crypto: {
    //   secret: 'squirrel',
    // },

  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000
  }
}; //Inicializamos Passport

app.use(_passport["default"].initialize()); //Le permitimos a passport que pueda manipular las sesiones

app.use((0, _expressSession["default"])(StoreOptions)); //Permitimos que passport pueda manipular las sessiones de nuestra app

app.use(_passport["default"].session()); //Lógica que ataja el Login de los usuarios

_passport["default"].use("login", _auth.loginFunc); //Lógica que ataja el SignUp de los usuarios


_passport["default"].use("signup", _auth.signupFunc);

var publicPath = _path["default"].resolve(__dirname, "../../public");

app.use(_express["default"]["static"](publicPath));

var layoutDirPath = _path["default"].resolve(__dirname, "../../views/layouts");

var defaultLayerPth = _path["default"].resolve(__dirname, "../../views/layouts/main.hbs");

var partialDirPath = _path["default"].resolve(__dirname, "../../views/partials");

app.set("view engine", "hbs");
app.engine("hbs", (0, _expressHandlebars["default"])({
  layoutsDir: layoutDirPath,
  extname: "hbs",
  defaultLayout: defaultLayerPth,
  partialsDir: partialDirPath
}));
app.use(_routes["default"]);
app.use('/api', _randomRouter["default"]);
var _default = app;
exports["default"] = _default;