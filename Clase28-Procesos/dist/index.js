"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _server = _interopRequireDefault(require("./services/server"));

var _db = require("./services/db");

var _minimist = _interopRequireDefault(require("minimist"));

var optionalArgsObject = {
  alias: {
    //Para pasar un alias a los argumentos que nos envian
    p: 'puerto'
  },
  "default": {
    //Si no nos envian el argumento, se setea por default
    p: 8080
  }
};
var args = (0, _minimist["default"])(process.argv.slice(2), optionalArgsObject);
var PORT = args.puerto;

var init = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _db.initDb)();

          case 2:
            console.log('Conectado a la DB');
            server = _server["default"].listen(PORT, function () {
              console.log("Servidor escuchando en el puerto ".concat(PORT));
            });
            server.on('error', function (error) {
              return console.log("Error en servidor: ".concat(error));
            });

          case 5:
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