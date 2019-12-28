const Item = require("../models/items");


/** 
* @params {req} request from client
* @params {req} response to client
* @params {next} method to move to the next middleware
* @return {object}
*/
exports.addItems = (req, res, next) => {
  console.log("Hello");

  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.desc;

  const item = new Item(title, price, desc);
  item
    .save()
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => console.log(err));
};
