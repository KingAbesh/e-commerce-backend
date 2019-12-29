const mongodb = require("mongodb");
const Item = require("../models/items");

const ObjectId = mongodb.ObjectId;
/**
 * @param {req} request from client
 * @param {req} response to client
 * @param {next} method to move to the next middleware
 * @return {object}
 */
exports.addItems = (req, res, next) => {
  console.log("Hello");

  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;

  const item = new Item(title, price, desc);
  item
    .save()
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => console.log(err));
};

exports.getItems = (req, res, next) => {
  Item.fetchItems()
    .then(item => res.status(200).send(item))
    .catch(err => console.log(err));
};

exports.editItem = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;
  const item = new Item(title, price, desc, new ObjectId(id));
  return item
    .save()
    .then(() => {
      res.status(200).send("Product updated successfully");
    })
    .catch(err => console.log(err));
};
