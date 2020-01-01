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

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(items => {
      console.log(items);
      res.status(200).send(items);
    })
    .catch(err => console.log(err));
};

exports.deleteCartItem = (req, res, next) => {
  const itemId = req.params.id;
  req.user
    .deleteCartItem(itemId)
    .then(() => res.status(200).send("Item sucessfully removed from cart"))
    .catch(err => console.log(err));
};

exports.addOrder = (req, res, next) => {
  req.user
    .createOrder()
    .then(() => {
      res.status(200).send("Successfully placed order");
    })
    .catch(err => console.log(err));
};

exports.fetchOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => console.log(err));
};
