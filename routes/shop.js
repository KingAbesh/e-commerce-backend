const router = require("express").Router();

const { getItems } = require("../controllers/shop");

router.get("/products", getItems);

module.exports = router;
