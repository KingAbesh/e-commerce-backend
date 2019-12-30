const router = require("express").Router();

const {
  getItems,
  getItem,
  addToCart,
  getCart,
  deleteCartItem
} = require("../controllers/shop");

/**
 * @desc fetches items
 * @method get
 * @api public
 */
router.get("/items", getItems);

/**
 * @desc fetches an item
 * @method get
 * @api public
 */
router.get("/items/:id", getItem);

/**
 * @desc gets all items in a cart
 * @method get
 * @api public
 */
router.get("/cart", getCart);

/**
 * @desc adds an item to a cart
 * @method post
 * @api public
 */
router.post("/add-to-cart/:id", addToCart);

/**
 * @desc deletes an item from a cart
 * @method delete
 * @api public
 */
router.delete("/delete-from-cart/:id", deleteCartItem);



module.exports = router;
