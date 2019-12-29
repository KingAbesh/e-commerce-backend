const express = require("express");

const app = express();

const mongoConnect = require("./utils/database").mongoConnect;

const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("5e081164f625231b98dcb996")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Oh oh, this page does not exist</h1>");
  next();
});

mongoConnect(() => {
  app.listen(3000);
});
