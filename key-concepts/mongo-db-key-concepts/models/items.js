const mongodb = require("mongodb");
const getDB = require("../mongoDB key concepts/database").getDB;

class Item {
  constructor(title, price, desc, id, userId) {
    this.title = title;
    this.price = price;
    this.desc = desc;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDB();
    let dbOperation;
    if (this._id) {
      // Update item;
      dbOperation = db
        .collection("items")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection("items").insertOne(this);
    }
    return dbOperation
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
  }

  static fetchItems() {
    const db = getDB();
    return db
      .collection("items")
      .find()
      .toArray()
      .then(items => {
        console.log(items);
        return items;
      })
      .catch(err => console.log(err));
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection("items")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then(item => {
        return item;
      })
      .catch(err => console.log(err));
  }

  static deleteById(id) {
    const db = getDB();
    return db
      .collection("items")
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then(result => console.log("Product deleted"))
      .catch(err => console.log(err));
  }
}

module.exports = Item;
