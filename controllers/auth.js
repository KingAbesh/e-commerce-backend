const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.status(401).send("User already exists");
      }
      bcrypt
        .hash(password, 12)
        .then(password => {
          let user = new User({
            email,
            password,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(() => res.status(200).send("User registered successfully"));
    })
    .catch(err => console.log(err));
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send("User not found, please provide valid credentials");
      }
      bcrypt.compare(password, user.password).then(valid => {
        if (!valid) {
          return res
            .status(403)
            .send(
              "Incorrect username or password, please review details and try again"
            );
        }
        res.status(200).send({
          _id: user._id,
          email: user.email,
          cart: user.cart
        });
      });
    })
    .catch(err => console.log(err));
};

exports.getUser = (req, res, next) => {
  res.send("You called me !");
};
