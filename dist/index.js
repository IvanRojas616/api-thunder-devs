"use strict";

var _app = _interopRequireDefault(require("./app"));

var _connectionDB = _interopRequireDefault(require("./db/connectionDB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//just start server when the db is connected
const main = () => {
  return _app.default.listen(_app.default.get('port'), () => {
    console.log(`Server on port ${_app.default.get('port')}`);
  });
};

_connectionDB.default.connectDB(main);
//# sourceMappingURL=index.js.map