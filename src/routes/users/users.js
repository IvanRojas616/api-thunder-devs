import { Router } from "express";
import { editUser, queryAllUsers, readOrCreateUser } from "../../controllers/users/usersController";

const router = Router();

const callbackResponse = (res) => (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  };

router.route("/").get((req, res) => {
    
    queryAllUsers(callbackResponse(res));

  });

  
router.route("/self").get((req, res) => {
    console.log("in route /self");
    
    readOrCreateUser(req, callbackResponse(res));

  });

  router.route('/edit/:id').patch((req, res) => {
    editUser(req.params.id, req.body, callbackResponse(res));
  });
  

  export default router;