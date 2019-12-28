const Item = require("../models/items");

exports.getItems = (req, res, next) => {
  Item.fetchItems()
    .then(products => {
      console.log(products);
      res.status(200).send(products);
    })
    .catch(err => console.log(err));
};
