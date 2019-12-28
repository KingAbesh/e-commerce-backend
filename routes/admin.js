const router = require("express").Router();

const { addItems } = require("../controllers/admin");

router.post("/add-item", addItems);

// router.post("/item", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

module.exports = router;
