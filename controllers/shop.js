const Item = require("../models/items");
const Order = require("../models/order");

//  gets all items

exports.getItems = (req, res, next) => {
  Item.find()
    .then(products => {
      console.log(products);
      res.status(200).send(products);
    })
    .catch(err => console.log(err));
};

// gets a single item

exports.getItem = (req, res, next) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      console.log(item);
      res.status(200).send(item);
    })
    .catch(err => console.log(err));
};

// adds an item(s) to a cart

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

//  gets a cart as specific to a user

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.itemId")
    .execPopulate()
    .then(user => {
      console.log(user.cart.items);
      res.status(200).send(user.cart.items);
    })
    .catch(err => console.log(err));
};

//  removes an item from a cart

exports.deleteCartItem = (req, res, next) => {
  const itemId = req.params.id;
  req.user
    .removeFromCart(itemId)
    .then(() => res.status(200).send("Item sucessfully removed from cart"))
    .catch(err => console.log(err));
};

// creates an order

exports.addOrder = (req, res, next) => {
  req.user
    .populate("cart.items.itemId")
    .execPopulate()
    .then(user => {
      const items = user.cart.items.map(item => {
        return { quantity: item.quantity, item: { ...item.itemId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.email,
          userId: req.user._id
        },
        items
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(res.status(200).send("Successfully placed order"))
    .catch(err => console.log(err));
};

// fetches all orders specific to a user

exports.fetchOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => console.log(err));
};
