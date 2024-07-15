const router = require("express").Router();

// Auth routes
const { login, register } = require("../controllers/authController");

router.get("/login", login);
router.get("/register", register);

module.exports = router;
