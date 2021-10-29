"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _usersController = require("../../controllers/users/usersController");

const router = (0, _express.Router)();

const callbackResponse = res => (err, result) => {
  if (err) throw err;
  res.status(200).json(result);
};

router.route("/").get((req, res) => {
  (0, _usersController.queryAllUsers)(callbackResponse(res));
});
router.route("/self").get((req, res) => {
  console.log("in route /self");
  (0, _usersController.readOrCreateUser)(req, callbackResponse(res));
});
router.route('/edit/:id').patch((req, res) => {
  (0, _usersController.editUser)(req.params.id, req.body, callbackResponse(res));
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=users.js.map