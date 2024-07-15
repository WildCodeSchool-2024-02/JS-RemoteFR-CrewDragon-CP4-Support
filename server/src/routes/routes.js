const router = require("express").Router();

// Middleware
const { hashPassword, verifyPassword } = require("../middleware/authService");

// Auth routes
const { login, register } = require("../controllers/authController");

router.post("/login", verifyPassword, login);
router.post("/register", hashPassword, register);

module.exports = router;
