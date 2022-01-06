import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config("../.env");

//database url from .env file (using dotenv)
const uri = process.env.DATABASE_URL;

//creating client to communicate with the database
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

// callback is a function that will be executed then that something happen
const connectDB = (callback) => {
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

export default { connectDB, getDBInstance };
