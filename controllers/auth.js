const crypto = require("crypto");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      // api_key: Api key goes here..
    }
  })
);

// Registers a user

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
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
    .then(() => res.status(200).send("User registered successfully"))
    .catch(err => console.log(err));
};

//  Logs in a user

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
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
        const token = jwt.sign(
          { email: user.email, _id: user._id },
          "somesecretkey",
          { expiresIn: "1hr" }
        );
        res.status(200).send({
          _id: user._id,
          token
        });
      });
    })
    .catch(err => console.log(err));
};

exports.passwordReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) res.status(402).send({ message: "something went wrong" });
    const token = buffer.toString("hex");
    console.log(req.body.email);
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          res.status(404).send({ message: "aww sorry, user not found!" });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        console.log(user.resetTokenExpiration);
        return user.save();
      })
      .then(result => {
        res
          .status(200)
          .send({ message: "Password reset link sent successfully" });
        transporter.sendMail({
          to: req.body.email,
          from: "javascripters@gmail.com",
          subject: "Password Reset",
          html: `<p>You requested a password reset</p>
                <p>Please click this <a href="/https://localhost:3000/reset/${token}">link</a> to set a new password</p>
          `
        });
      })
      .catch(err => console.log(err));
  });
};

exports.updatePassword = async (req, res, next) => {
  const updatedPassword = req.body.password;
  const userId = req.body.user_id;
  const token = req.params.token;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    });
    if (!user) {
      res.status(401).send({
        message: "Invalid user credentials. Please review and retry"
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(updatedPassword, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.send({
      message: "Password successfully updated!"
    });
  } catch (err) {
    console.log(err);
  }
};
