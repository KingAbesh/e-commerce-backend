const router = require("express").Router();

const { signUp, logIn, passwordReset } = require("../controllers/auth");

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

router.post("/signup", signUp);

router.post("/reset", passwordReset);

module.exports = router;
