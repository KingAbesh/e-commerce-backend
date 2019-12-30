const Item = require("../models/items");
/**
 * @param {req} request from client
 * @param {req} response to client
 * @param {next} method to move to the next middleware
 * @return {object}
 */
exports.addItems = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const item = new Item({ title, price, description, userId: req.user._id });
  item
    .save()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => console.log(err));
};

exports.getItems = (req, res, next) => {
  Item.find()
    .then(item => res.status(200).send(item))
    .catch(err => console.log(err));
};

exports.editItem = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  Item.findById(id)
    .then(item => {
      item.title = title;
      item.price = price;
      item.description = description;
      return item.save();
    })
    .then(() => {
      res.status(200).send("Product updated successfully");
    })
    .catch(err => console.log(err));
};

exports.deleteItem = (req, res, next) => {
  const id = req.params.id;
  Item.findByIdAndRemove(id)
    .then(() => res.status(200).send("Successfully deleted item"))
    .catch(err => console.log(err));
};
