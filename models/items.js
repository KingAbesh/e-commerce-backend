const mongodb = require("mongodb");
const getDB = require("../utils/database").getDB;

class Item {
  constructor(title, price, desc) {
    this.title = title;
    this.price = price;
    this.desc = desc;
  }

  save() {
    const db = getDB();
    return db
      .collection("items")
      .insertOne(this)
      .then(result => console.log(result))
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
        console.log(item);
        return item;
      })
      .catch(err => console.log(err));
  }
}

module.exports = Item;
