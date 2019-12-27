const getDB = require("../utils/database").getDB;

class Item {
  constructor(title, price, desc, imageURL) {
    this.title = title;
    this.price = price;
    this.desc = desc;
    this.imageURL = imageURL || null;
  }

  save() {
      const db = getDB();
      db.collection('items').insertOne(this).then(result => console.log(result)).catch(err => console.log(err));
  }
}

module.exports = Item;
