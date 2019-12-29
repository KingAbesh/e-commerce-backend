const router = require("express").Router();

const { getItems, getItem } = require("../controllers/shop");

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

module.exports = router;
