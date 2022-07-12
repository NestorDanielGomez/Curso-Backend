"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _server = _interopRequireDefault(require("./services/server"));

var _db = require("./services/db");

var _cluster = _interopRequireDefault(require("cluster"));

var _minimist = _interopRequireDefault(require("minimist"));

var _os = _interopRequireDefault(require("os"));

var numCPUs = _os["default"].cpus().length;

var optionalArgsObject = {
  alias: {
    //Para pasar un alias a los argumentos que nos envian
    p: 'puerto',
    m: 'modo'
  },
  "default": {
    //Si no nos envian el argumento, se setea por default
    p: 8080,
    m: 'FORK'
  }
};
var args = (0, _minimist["default"])(process.argv.slice(2), optionalArgsObject);
var PORT = args.puerto;
exports.PORT = PORT;
var modoCluster = args.modo === 'CLUSTER';

if (modoCluster && _cluster["default"].isPrimary) {
  console.log('MODO CLUSTER');

  for (var i = 0; i < numCPUs; i++) {
    _cluster["default"].fork();
  }

  _cluster["default"].on('exit', function (worker) {
    console.log("Worker ".concat(worker.process.pid, " died at ").concat(Date()));

    _cluster["default"].fork();
  });
} else {
  var init = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var server;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('MODO FORK');
              _context.next = 3;
              return (0, _db.initDb)();

            case 3:
              console.log('Conectado a la DB');
              server = _server["default"].listen(PORT, function () {
                console.log("Servidor escuchando en el puerto ".concat(PORT));
              });
              server.on('error', function (error) {
                return console.log("Error en servidor: ".concat(error));
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  init();
}