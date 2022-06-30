"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../config/index"));

var initDb = function initDb() {
  return _mongoose["default"].connect(_index["default"].MONGO_ATLAS_URL, {
    useNewUrlParser: true
  });
};

exports.initDb = initDb;