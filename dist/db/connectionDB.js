"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config("../.env"); //database url from .env file (using dotenv)


const uri = process.env.DATABASE_URL; //creating client to communicate with the database

const client = new _mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let dbConnection; // callback is a function that will be executed then that something happen

const connectDB = callback => {
  client.connect((err, clientMongo) => {
    if (err) {
      return err;
    }

    console.log("Connected");
    dbConnection = clientMongo.db("thunder-db");
    return callback();
  });
};

const getDBInstance = () => {
  return dbConnection;
};

var _default = {
  connectDB,
  getDBInstance
};
exports.default = _default;
//# sourceMappingURL=connectionDB.js.map