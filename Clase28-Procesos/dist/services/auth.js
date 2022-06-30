"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupFunc = exports.loginFunc = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _user = require("../model/user");

var strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
};

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, username, password, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('LOGIN!!');
            _context.next = 3;
            return _user.UserModel.findOne({
              username: username
            });

          case 3:
            user = _context.sent;

            if (!(!user || !user.isValidPassword(password))) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 6:
            console.log('ENCONTRE UN USUARIO');
            return _context.abrupt("return", done(null, user));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var signup = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, username, password, done) {
    var newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("SIGNUP!!");
            _context2.prev = 1;
            _context2.next = 4;
            return _user.UserModel.create({
              username: username,
              password: password
            });

          case 4:
            newUser = _context2.sent;
            return _context2.abrupt("return", done(null, newUser));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log("Hubo un error al registrarse!");
            console.log(_context2.t0);
            return _context2.abrupt("return", done(null, false));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function signup(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var loginFunc = new _passportLocal.Strategy(strategyOptions, login);
exports.loginFunc = loginFunc;
var signupFunc = new _passportLocal.Strategy(strategyOptions, signup);
/*** Express-session crea un objeto session en la request* passport
 *  agrega a req.session un objeto llamado passport para guardar
 *  la info del usuario* Cuando llamamos a done en login o en signup
 *  y pasamos el usuario lo siguiente que ocurre es que se ejecuta
 * passport.serializeUser* Esta funcion agarra el usuario que recibio
 *  y lo guarda en req.session.passport* En este caso estamos creando
 *  una key llamado user con la info del usuario dentro de
 *  req.session.passport*/

exports.signupFunc = signupFunc;

_passport["default"].serializeUser(function (user, done) {
  console.log("Se Ejecuta el serializeUser");
  done(null, user._id);
});
/**DeserializeUser Permite tomar la info que mandamos con el
 * serializeUser para hacer algun extra de busqueda de informacion*/


_passport["default"].deserializeUser(function (userId, done) {
  console.log('Se Ejecuta el deserializeUser');

  _user.UserModel.findById(userId).then(function (user) {
    return done(null, user);
  });
});