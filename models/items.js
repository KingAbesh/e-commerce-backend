const getDB = require("../utils/database").getDB;

class Item {
  constructor(title, price, desc) {
    this.title = title;
    this.price = price;
    this.desc = desc;
  }

  save() {
    const db = getDB();
    return db.collection("items")
      .insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}

module.exports = Item;
