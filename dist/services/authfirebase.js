"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebaseAdmin = require("firebase-admin");

var _thunderdevsFirebaseSdk = _interopRequireDefault(require("../../thunderdevs-firebase-sdk.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//este archivo json no se debe subir nunca
(0, _firebaseAdmin.initializeApp)({
  credential: _firebaseAdmin.credential.cert(_thunderdevsFirebaseSdk.default)
});
const db = (0, _firebaseAdmin.firestore)();
var _default = db;
exports.default = _default;
//# sourceMappingURL=authfirebase.js.map