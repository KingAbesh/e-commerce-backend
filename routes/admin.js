const router = require("express").Router();

const { addItems, getItems, editItem, deleteItem } = require("../controllers/admin");

/**
 * @route admin/add-item
 * @desc creates an item
 * @method post
 * @api public
 */

router.post("/add-item", addItems);

/**
 * @route admin/items
 * @desc gets all items
 * @method get
 * @api public
 */
router.get("/items", getItems);

// /**
//  * @route admin/edit-item/:id
//  * @desc edits an item
//  * @method put
//  * @api public
//  */

// router.put("/edit-item/:id", editItem);

// /**
//  * @route admin/edit-item/:id
//  * @desc deletes an item
//  * @method delete
//  * @api public
//  */

// router.delete("/delete-item/:id", deleteItem);

module.exports = router;
