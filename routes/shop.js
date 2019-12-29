const router = require("express").Router();

const { getItems, getItem, addToCart } = require("../controllers/shop");

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
 * @desc adds an item to a cart
 * @method post
 * @api public
 */
router.post('/cart/:id', addToCart)

module.exports = router;
