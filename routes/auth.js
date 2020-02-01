const router = require("express").Router();
const { check, body } = require("express-validator");

const {
  signUp,
  logIn,
  passwordReset,
  updatePassword
} = require("../controllers/auth");

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
      .withMessage("Invalid email, please review and retry"),
      body("password").isLength({min: 5}).isAlphanumeric()
  ],
  signUp
);

router.post("/reset", passwordReset);

router.post("/reset/:token", updatePassword);

module.exports = router;
