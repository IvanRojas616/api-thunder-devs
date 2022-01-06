import jwt_decode from "jwt-decode";
import connectionDB from "../db/connectionDB";

//Here verify if user isn't rejected etc in his state
//Obviously when he register first time, never state is rejected

const authStateUser = async (req, res, next) => {
  console.log("Inside custom middleware");
  //1. get user from token
  const token = req.headers.authorization;
  const decoded = jwt_decode(token.split("Bearer ")[1]);
  const user = decoded["http://localhost/userData"];
  //2.read user from db
  await connectionDB
    .getDBInstance()
    .collection("users")
    .findOne({ email: user.email }, async (err, response) => {
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

export default authStateUser;
