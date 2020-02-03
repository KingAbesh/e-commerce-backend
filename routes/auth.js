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

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password", "password has to be valid")
      .isLength({ min: 5 })
      .trim()
  ],
  logIn
);

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
      })
      .normalizeEmail(),
    body("password", "please enter a password that is at least 5 characters")
      .isLength({ min: 5 })
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
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
