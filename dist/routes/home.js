"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

//Para usar síntaxis ES6 en adelante debemos instalar babel y configurarlo en el .babelrc
const router = (0, _express.Router)();
router.get("/", (req, res) => {
  res.send({
    "msg": "Hola Mundo"
  });
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=home.js.map