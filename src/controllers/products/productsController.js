import connectionDB from "../../db/connectionDB";
import { ObjectId } from "mongodb";


const queryAllProducts = async (callback) => {
  await connectionDB
    .getDBInstance()
    .collection("products")
    .find({})
    .toArray(callback);
};

const validId = async (idProduct) => {
  const bd_temp = [];
    await connectionDB
      .getDBInstance()
      .collection("products")
      .find({})
      .forEach((doc) => {
        bd_temp.push(doc.idProduct);
      });
    console.log(bd_temp);
    const exists = bd_temp.includes(idProduct);
    return exists;
}

const createNewProduct = async (newData, callback) => { 
    const newProduct = {
      idProduct: newData.idProduct,
      description: newData.description,
      unitPrice: newData.unitPrice,
      status: Boolean(newData.status),
    };
    await connectionDB
      .getDBInstance()
      .collection("products")
      .insertOne(newProduct, callback);
};

//this comprobation is duty to front-end (only fields required)
const updateProduct = async (idToUpdate, updatedData, callback) => {
  await connectionDB
    .getDBInstance()
    .collection("products")
    .updateOne(
      { idProduct: idToUpdate },
      { $set: updatedData },
      { returnOriginal: true },
      callback
    );
};

const deleteProduct = async (idToDelete, callback) => {
  await connectionDB
    .getDBInstance()
    .collection("products")
    .deleteOne({ idProduct: idToDelete }, callback);
};
export { queryAllProducts, createNewProduct, updateProduct, deleteProduct, validId };
 