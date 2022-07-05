"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _os = _interopRequireDefault(require("os"));

var _express = require("express");

var router = (0, _express.Router)(); //////////////DESAFIO CLASE 28
//////////////////////PROCESOS

var numCPUs = _os["default"].cpus().length;

console.log('nro CPUs -->> ', numCPUs);
var infodelProceso = {
  args: process.argv.slice(2),
  plataforma: process.platform,
  nodeVersion: process.version,
  memoria: JSON.stringify(process.memoryUsage.rss()),
  execPath: process.cwd(),
  processID: process.pid,
  carpeta: process.argv[1],
  cantidadNucleos: numCPUs
};
router.get('/info', function (req, res) {
  var data = infodelProceso;
  res.render('info', {
    data: data
  });
}); //passport

var passportOptions = {
  badRequestMessage: "falta username / password"
}; //Middleware

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    next();
  }
};
/* --------- REGISTER ---------- */


router.get('/signup', function (req, res) {
  res.render('register');
}); //SIGN UP

router.post('/signup', function (req, res, next) {
  _passport["default"].authenticate('signup', passportOptions, function (err, user, info) {
    console.log('Info SIGNUP');
    console.log(err, user, info);

    if (err) {
      return next(err);
    }

    if (!user) return res.render('register-error');
    res.render('usuarioCreado');
  })(req, res, next);
});
/* --------- LOGIN ---------- */

router.get('/login', function (req, res) {
  res.render('login');
});
/* --------- LOGIN-Error---------- */

router.get('/login-error', function (req, res) {
  res.render('login-error');
}); //LOGIN

router.post('/login', _passport["default"].authenticate('login', {
  failureRedirect: '/login-error',
  failureMessage: true
}), function (req, res) {
  res.redirect('/datos');
});
/* --------- DATOS ---------- */

router.get('/datos', isLoggedIn, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var datos, nombre;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            datos = req.user;
            nombre = datos.username;
            res.render('datos', {
              nombre: nombre
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //GET

router.get("/", function (req, res) {
  res.redirect('/datos');
});
/* --------- LOGOUT ---------- */

router.get('/logout', function (req, res) {
  var datos = req.user;
  var nombre = datos.username;
  res.render('logout', {
    nombre: nombre
  });
  req.session.destroy();
});
var _default = router;
exports["default"] = _default;