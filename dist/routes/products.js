"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongodb = require("mongodb");

const router = (0, _express.Router)();
router.route("/").get(async (req, res) => {
  //if there is going wrong try/catch handle it
  try {
    await dbConnection.collection("users").find({}).toArray((err, result) => {
      if (err) throw err;
      result.forEach(element => {
        console.log(element._id);
      });
    });
  } catch (error) {
    console.log("Error get request in products", error);
  } finally {}

  res.send({
    msg: "Get request successfully"
  });
});
router.post("/create-product", async (req, res) => {
  console.log(req.body);
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };
  const yu = await db.collection("sales").add(newProduct);
  console.log(yu);
  res.send({
    name: "Hola Mundo"
  });
});
router.patch("/update-product", (req, res) => {
  client.connect(err => {
    const collection = client.db("thunder-db").collection("users"); // perform actions on the collection object

    console.log(req.body);
    collection.updateOne({
      idProduct: req.body.id
    }, {
      $set: {
        unitPrice: req.body.price,
        status: req.body.status
      }
    }, function (err, reds) {
      if (err) throw err;
      console.log("1 document updated", reds);
      client.close();
    });
  });
  client.close();
  res.send({
    msg: "Updated"
  });
});
router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const resd = await db.collection("sales").doc(req.params.id).delete();
  res.send({
    mgs: "Deleted",
    rd: resd
  });
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=products.js.map