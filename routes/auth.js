const router = require("express").Router();
const { check, body } = require("express-validator");

const {
  signUp,
  logIn,
  passwordReset,
  updatePassword
} = require("../controllers/auth");
const User = require("../models/user");

/**
 * @desc logs in a user
 * @method post
 * @api public
 */

router.post("/login", logIn);

/**
 * @desc registers a user
 * @method get
 * @api public
 */

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid email, please review and retry")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("User already exists");
          }
        });
      }),
    body(
      "password",
      "please enter a password that is at least 5 characters"
    ).isLength({ min: 5 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match");
      }
      return true;
    })
  ],
  signUp
);

router.post("/reset", passwordReset);

router.post("/reset/:token", updatePassword);

module.exports = router;
