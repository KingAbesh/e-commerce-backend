const router = require("express").Router();

const { addItems, getItems, editItem } = require("../controllers/admin");

/**
 * @desc creates an item
 * @method post
 * @api public
 */

router.post("/add-item", addItems);

/**
 * @desc gets all items
 * @method get
 * @api public
 */
router.get("/items", getItems);

router.post("/edit-item/:id", editItem);

module.exports = router;
