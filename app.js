const express = require("express");

const app = express();
const mongoose = require("mongoose");

const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("5e097c1c61cb9d01486e9d4d")
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

mongoose
  .connect(
    "mongodb+srv://king_abesh:Abesh123@cluster0-g8lvt.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Abas",
          email: "abas@test.com",
          cart: { items: [] }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => console.log(err));
