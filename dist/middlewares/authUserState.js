"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _connectionDB = _interopRequireDefault(require("../db/connectionDB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Here verify if user isn't rejected etc in his state
//Obviously when he register first time, never state is rejected
const authStateUser = async (req, res, next) => {
  console.log("Inside custom middleware"); //1. get user from token

  const token = req.headers.authorization;
  const decoded = (0, _jwtDecode.default)(token.split("Bearer ")[1]);
  const user = decoded["http://localhost/userData"]; //2.read user from db

  await _connectionDB.default.getDBInstance().collection("users").findOne({
    email: user.email
  }, async (err, response) => {
    //if not found in the db, then next(), for create the user
    //this was a bug, but with the if/else extren is resolved
    if (response) {
      //3. verify user state
      if (response.state === "rejected") {
        //5.whereas if he doesn't, send authentication error
        res.sendStatus(403);
      } else {
        //4.if user is authorized or pending, execute next()
        next();
      }
    } else {
      next();
    }
  });
};

var _default = authStateUser;
exports.default = _default;
//# sourceMappingURL=authUserState.js.map