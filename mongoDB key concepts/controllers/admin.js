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
  const desc = req.body.desc;
  const id = req.user._id; // the id is stored in user object at the app.js file so we can have access to it across our application

  const item = new Item(title, price, desc, null, id);
  item
    .save()
    .then(result => {
      res.status(200).send(result["ops"]);
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
  const item = new Item(title, price, desc, id);
  return item
    .save()
    .then(() => {
      res.status(200).send("Product updated successfully");
    })
    .catch(err => console.log(err));
};

exports.deleteItem = (req, res, next) => {
  const id = req.params.id;
  Item.deleteById(id)
    .then(() => res.status(200).send("Successfully deleted item"))
    .catch(err => console.log(err));
};
