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
    .then(product => {
      console.log(product);
      res.status(200).send(product);
    })
    .catch(err => console.log(err));
};
