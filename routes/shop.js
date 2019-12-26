const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("<h2>Hello Sure Boy</h2>");
});


module.exports = router;