"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readOrCreateUser = exports.queryAllUsers = exports.editUser = exports.createUser = void 0;

var _connectionDB = _interopRequireDefault(require("../../db/connectionDB"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryAllUsers = async callback => {
  console.log('query');
  await _connectionDB.default.getDBInstance().collection('users').find({}).limit(50).toArray(callback);
};

exports.queryAllUsers = queryAllUsers;

const createUser = async (dataUser, callback) => {
  await _connectionDB.default.getDBInstance().collection("users").insertOne(dataUser, callback);
};

exports.createUser = createUser;

const readOrCreateUser = async (tokenreq, callback) => {
  console.log("i am here"); //1.get data user from token

  const token = tokenreq.headers.authorization;
  const decoded = (0, _jwtDecode.default)(token.split("Bearer ")[1]);
  const user = decoded["http://localhost/userData"]; //2.with email or auth0 id, check if user is in bd mongo

  await _connectionDB.default.getDBInstance().collection("users").findOne({
    email: user.email
  }, async (err, response) => {
    console.log(response);

    if (response) {
      //3.if user is in bd, then we send the data user to react
      //if enter here, the response is the found document
      callback(err, response);
    } else {
      //4.if user doesn't exist, then we create it and send the info to react
      //this is for mongo creates his own id, and not take auth0 id
      user.auth0Id = user._id;
      delete user._id; //Here start the theme of roles(dummy rbac arch)

      user.role = "no role";
      user.state = "pending";
      await createUser(user, (err, response) => {
        callback(err, user);
      });
    }
  });
};

exports.readOrCreateUser = readOrCreateUser;

const editUser = async (id, edition, callback) => {
  const filterUser = {
    _id: new _mongodb.ObjectId(id)
  };
  const operation = {
    $set: edition
  };
  await _connectionDB.default.getDBInstance().collection('users').findOneAndUpdate(filterUser, operation, {
    upsert: true,
    returnOriginal: true
  }, callback);
};

exports.editUser = editUser;
//# sourceMappingURL=usersController.js.map