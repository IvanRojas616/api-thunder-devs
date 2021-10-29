import connectionDB from "../../db/connectionDB";
import jwt_decode from "jwt-decode";
import { ObjectId } from "mongodb";

export const queryAllUsers = async (callback) => {
    console.log('query');
    await connectionDB.getDBInstance().collection('users').find({}).limit(50).toArray(callback);
  };

export const createUser = async (dataUser, callback) => {
  await connectionDB
    .getDBInstance()
    .collection("users")
    .insertOne(dataUser, callback);
};

export const readOrCreateUser = async (tokenreq, callback) => {
  console.log("i am here");
  //1.get data user from token
  const token = tokenreq.headers.authorization;
  const decoded = jwt_decode(token.split("Bearer ")[1]);
  const user = decoded["http://localhost/userData"];

  //2.with email or auth0 id, check if user is in bd mongo
  await connectionDB
    .getDBInstance()
    .collection("users")
    .findOne({ email: user.email }, async (err, response) => {
      console.log(response);
      if (response) {
        //3.if user is in bd, then we send the data user to react
        //if enter here, the response is the found document
        callback(err, response);
      } else {
        //4.if user doesn't exist, then we create it and send the info to react
        //this is for mongo creates his own id, and not take auth0 id
        user.auth0Id = user._id;
        delete user._id;

        //Here start the theme of roles(dummy rbac arch)
        user.role = "no role";
        user.state = "pending";
        await createUser(user, (err, response) => {
          callback(err, user);
        });
      }
    });
};

export const editUser = async (id, edition, callback) => {
  const filterUser = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };

  await connectionDB.getDBInstance()
    .collection('users')
    .findOneAndUpdate(filterUser, operation, { upsert: true, returnOriginal: true }, callback);
};