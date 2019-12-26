const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/add-item', (req, res, next) => {
  res.send(
    "<form action='/item' method='POST'><input type='text' name='title'><button type='submit'>send</button></form>"
  );
});

app.post('/item', (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  res.send("<h2>Hello Sure Boy</h2>");
});

app.listen(3000);
