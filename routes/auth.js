const router = require("express").Router();

const {getUser, signUp, logIn} = require("../controllers/auth");

router.get('/login', getUser);

router.post('/login', logIn);

router.post('/signup', signUp)

module.exports = router;