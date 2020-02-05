const path = require("path");
const fs = require("fs");

const PDFDocument = require("pdfkit");

const Item = require("../models/items");
const Order = require("../models/order");
const User = require("../models/user");

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
      User.findOne({ _id: req._id }).then(user => {
        return user.addToCart(item);
      });
    })
    .then(result => {
      res
        .status(200)
        .send({ success: true, message: "item successfully added to cart" });
    })
    .catch(err => console.log(err));
};

//  gets a cart as specific to a user

exports.getCart = (req, res, next) => {
  User.findOne({ _id: req._id })
    .populate("cart.items.itemId")
    .then(user => {
      res.status(200).send(user.cart.items);
    })
    .catch(err => console.log(err));
};

//  removes an item from a cart

exports.deleteCartItem = (req, res, next) => {
  const itemId = req.params.id;
  User.findOne({ _id: req._id })
    .then(user => {
      user
        .removeFromCart(itemId)
        .then(
          res
            .status(200)
            .send({ message: "Item successfully removed from cart" })
        );
    })
    .catch(err => console.log(err));
};

// creates an order

exports.addOrder = (req, res, next) => {
  User.findOne({ _id: req._id })
    .populate("cart.items.itemId")
    .then(user => {
      const items = user.cart.items.map(item => {
        return { quantity: item.quantity, item: { ...item.itemId._doc } };
      });
      const order = new Order({
        user: {
          email: user.email,
          userId: req._id
        },
        items
      });
      order.save();
      return user.clearCart();
    })
    .then(res.status(200).send("Successfully placed order"))
    .catch(err => console.log(err));
};

// fetches all orders specific to a user

exports.fetchOrders = (req, res, next) => {
  Order.find({ "user.userId": req._id })
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => console.log(err));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.id;

  Order.findById(orderId).then(order => {
    if (!order) {
      return next(new Error("No order found"));
    }
    const invoiceName = `invoice-${orderId}.pdf`;
    const invoicePath = path.join("data", "invoices", invoiceName);
    /**
     * ! creating a readable stream so node only deals with one chunk at a time.
     * ! Better for bigger files
     */

    const pdfDoc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + invoiceName + '"'
    );
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(14).text("Order Invoice", {
      underline: true
    });
    pdfDoc.text("______________________");
    let total = 0;
    order.items.forEach(item => {
      total += item.quantity * item.item.price;
      pdfDoc.text(
        item.item.title + " - " + item.quantity + " x " + "$" + item.item.price
      );
    });
    pdfDoc.text("Total Price: $" + total);
    pdfDoc.end();

    /**
     * ? why the code below
     * ! to show a less optimized way to download pdf files where the whole data has to be preloaded before hand
     */

    // fs.readFile(invoicePath, (err, data) => {
    //   if (err) return next(err);
    //   res.setHeader("Content-Type", "application/pdf");
    //   res.setHeader(
    //     "Content-Disposition",
    //     'inline; filename="' + invoiceName + '"'
    //   );
    //   res.send(data);
    // });
  });
};
