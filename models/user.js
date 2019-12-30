const mongodb = require("mongodb");
const getDB = require("../utils/database").getDB;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  addToCart(item) {
    const cartProductIndex = this.cart.items.findIndex(cartProduct => {
      return cartProduct.itemId.toString() === item._id.toString();
    });

    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push({
        itemId: new mongodb.ObjectId(item._id),
        quantity: newQty
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDB();
    const itemIds = this.cart.items.map(item => item.itemId);
    return db
      .collection("items")
      .find({ _id: { $in: itemIds } })
      .toArray()
      .then(items => {
        return items.map(item => {
          return {
            ...item,
            quantity: this.cart.items.find(i => {
              return i.itemId.toString() === item._id.toString();
            }).quantity
          };
        });
      });
  }

  deleteCartItem(id) {
    const db = getDB();

    const updatedCartItems = this.cart.items.filter(item => {
      return item.itemId.toString() !== id.toString();
    });
    const updatedCart = {
      items: updatedCartItems
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  createOrder() {
    const db = getDB();
    return db
      .collection("orders")
      .insertOne(this.cart)
      .then(result => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch(err => console.log(err));
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
