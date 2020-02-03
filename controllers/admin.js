const Item = require("../models/items");
const { validationResult } = require("express-validator");
/**
 * @param {req} http request from client
 * @param {req} http response to client
 * @param {next} method to move to the next middleware
 * @return {object}
 */

// Creates an item

exports.createItem = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const image = req.body.image;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const item = new Item({ title, price, description, userId: req.user._id });
  item
    .save()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => console.log(err));
};

// gets all items

exports.getItems = (req, res, next) => {
  Item.find()
    .then(item => res.status(200).send(item))
    .catch(err => console.log(err));
};

// updates an item

exports.editItem = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

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

// deletes an item

exports.deleteItem = (req, res, next) => {
  const id = req.params.id;
  Item.findByIdAndRemove(id)
    .then(() => res.status(200).send("Successfully deleted item"))
    .catch(err => console.log(err));
};
