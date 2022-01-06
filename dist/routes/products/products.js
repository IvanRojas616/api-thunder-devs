"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _productsController = require("../../controllers/products/productsController");

const router = (0, _express.Router)(); //It's used for rsponse generic answers
// res => err,result, function nesting
//here it give the function (err, result)

const callbackResponse = res => (err, result) => {
  if (err) throw err;
  res.status(200).json(result);
};

router.route("/").get((req, res) => {
  //if there is going wrong try/catch handle it
  try {
    (0, _productsController.queryAllProducts)(callbackResponse(res));
  } catch (error) {
    console.log("Error get request in products", error);
  }
});
router.route("/create-product").post(async (req, res) => {
  try {
    const existsPromise = (0, _productsController.validId)(req.body.idProduct);
    existsPromise.then(isDuplicated => {
      if (!isDuplicated) {
        (0, _productsController.createNewProduct)(req.body, callbackResponse(res));
      } else {
        console.log("id duplicated");
        res.sendStatus(400);
      }
    });
  } catch (error) {
    console.log("Error post request in products");
    res.sendStatus(500);
  }
});
router.route("/update-product/:idProduct").patch((req, res) => {
  try {
    const existsPromise = (0, _productsController.validId)(req.params.idProduct);
    existsPromise.then(isFound => {
      if (isFound) {
        (0, _productsController.updateProduct)(req.params.idProduct, req.body, callbackResponse(res));
      } else {
        console.log("id not found patch request");
        res.sendStatus(400);
      }
    });
  } catch (error) {
    console.log("Error patch request in products");
  }
});
router.delete("/delete/:idProduct", (req, res) => {
  try {
    const existsPromise = (0, _productsController.validId)(req.params.idProduct);
    existsPromise.then(isFound => {
      if (isFound) {
        (0, _productsController.deleteProduct)(req.params.idProduct, callbackResponse(res));
      } else {
        console.log("id not found");
        res.sendStatus(400);
      }
    });
  } catch (error) {
    console.log("Error delete request in products");
    res.sendStatus(500);
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=products.js.map