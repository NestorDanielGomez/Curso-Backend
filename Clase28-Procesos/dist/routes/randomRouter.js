"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var scriptPath = _path["default"].resolve(__dirname, '../utils/operacion.js');

var router = (0, _express.Router)();
router.get('/randoms', function (req, res) {
  var cant = req.query.cant || 100000000;
  var computo = (0, _child_process.fork)(scriptPath);
  computo.send(cant);
  computo.on('message', function (resultado) {
    res.json({
      result: resultado
    });
  });
});
module.exports = router;