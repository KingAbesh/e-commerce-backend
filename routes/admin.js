const router = require('express').Router();

router.get("/add-item", (req, res, next) => {
  res.send(
    "<form action='/admin/item' method='POST'><input type='text' name='title'><button type='submit'>send</button></form>"
  );
});

router.post("/item", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});


module.exports = router;

