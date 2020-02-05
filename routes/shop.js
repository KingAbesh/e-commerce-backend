const router = require("express").Router();
const isAuth = require("../middlewares/auth");

const {
  getItems,
  getItem,
  addToCart,
  getCart,
  deleteCartItem,
  addOrder,
  getInvoice,
  fetchOrders
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
router.get("/items/:id", isAuth, getItem);

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
router.post("/add-to-cart/:id", isAuth, addToCart);

/**
 * @desc deletes an item from a cart
 * @method delete
 * @api public
 */
router.delete("/delete-from-cart/:id", isAuth, deleteCartItem);

/**
 * @desc creates an order
 * @method post
 * @api public
 */
router.post("/create-order", isAuth, addOrder);

/**
 * @desc fetches all orders specific to a user
 * @method get
 * @api public
 */
router.get("/orders", isAuth, fetchOrders);

/**
 * @desc creates an invoice for an order
 * @method get
 * @api public
 */

router.get("/orders/:id", isAuth, getInvoice);

module.exports = router;
