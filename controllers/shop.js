const Item = require("../models/items");

exports.getItems = (req, res, next) => {
  Item.fetchItems()
    .then(products => {
      console.log(products);
      res.status(200).send(products);
    })
    .catch(err => console.log(err));
};

exports.getItem = (req, res, next) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      console.log(item);
      res.status(200).send(item);
    })
    .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then(item => {
      return req.user.addToCart(item);
    })
    .then(result => {
      res.status(200).send("item successfully added to cart");
    })
    .catch(err => console.log(err));
};
