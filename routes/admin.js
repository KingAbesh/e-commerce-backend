const router = require("express").Router();
const { check, body } = require("express-validator");

const {
  createItem,
  getItems,
  editItem,
  deleteItem
} = require("../controllers/admin");

/**
 * @route admin/add-item
 * @desc creates an item
 * @method post
 * @api public
 */

router.post(
  "/add-item",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Please make sure title is at least three characters")
      .trim(),
    body("price")
      .isFloat()
      .withMessage("Price can only be a number"),
    body("description")
      .isLength({ min: 5, max: 100 })
      .withMessage("Please make sure title is at least five characters")
      .trim()
  ],
  createItem
);

/**
 * @route admin/items
 * @desc gets all items
 * @method get
 * @api public
 */
router.get("/items", getItems);

/**
 * @route admin/edit-item/:id
 * @desc edits an item
 * @method put
 * @api public
 */

router.put(
  "/edit-item/:id",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Please make sure title is at least three characters")
      .trim(),
    body("price")
      .isFloat()
      .withMessage("Price can only be a number"),
    body("description")
      .isLength({ min: 5, max: 100 })
      .withMessage("Please make sure title is at least five characters")
      .trim()
  ],
  editItem
);

/**
 * @route admin/delete-item/:id
 * @desc deletes an item
 * @method delete
 * @api public
 */

router.delete("/delete-item/:id", deleteItem);

module.exports = router;
