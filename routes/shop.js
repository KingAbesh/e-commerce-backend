const router = require("express").Router();

const { getItems, getItem } = require("../controllers/shop");

router.get("/products", getItems);
router.get("/products/:id", getItem);

module.exports = router;
