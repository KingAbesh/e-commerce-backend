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
