const Item = require("../models/items");
const { validationResult } = require("express-validator");
const fileCleanup = require("../utils/file");
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
  const image = req.file;
  const errors = validationResult(req);
  if (!image) {
    return res.status(422).send({ errors: "attached file is not an image" });
  }
  const imageUrl = image.path;
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const item = new Item({
    title,
    price,
    description,
    image: imageUrl,
    userId: req._id
  });
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
  const image = req.file;
  const description = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  Item.findById(id)
    .then(item => {
      if (!item) {
        return res.status(422).send({ errors: "item not found" });
      }
      if (item.userId.toString() !== req._id) {
        return res
          .status(403)
          .send({ success: "false", message: "Not authorized" });
      }
      item.title = title;
      item.price = price;
      if (image) {
        fileCleanup.deleteFile(item.image);
        item.image = image.path;
      }
      item.description = description;
      item.save().then(() => {
        return res.status(200).send("Product updated successfully");
      });
    })
    .catch(err => console.log(err));
};

// deletes an item

exports.deleteItem = (req, res, next) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      if (!item) {
        return res.status(404).send({ err: "Item not found" });
      }
      if (item.userId.toString() !== req._id) {
        return res
          .status(403)
          .send({ success: "false", message: "Not authorized" });
      }
      fileCleanup.deleteFile(item.image);
      return Item.findByIdAndRemove(id).then(() =>
        res.status(200).send("Successfully deleted item")
      );
    })
    .catch(err => next(err));
};
