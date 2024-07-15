const router = require("express").Router();

// Middleware
const { hashPassword, verifyPassword } = require("../middleware/authService");
const { verifyToken, isTrainer } = require("../middleware/jwt");

// Auth routes
const { login, register } = require("../controllers/authController");

router.post("/login", verifyPassword, login);
router.post("/register", hashPassword, register);

// Session routes
const {
	createSession,
	getSessions,
	getSessionById,
	updateSession,
	deleteSession,
} = require("../controllers/sessionController");

router.post("/sessions", verifyToken, isTrainer, createSession);
router.get("/sessions", verifyToken, getSessions);
router.get("/sessions/:id", verifyToken, getSessionById);
router.put("/sessions/:id", verifyToken, isTrainer, updateSession);
router.delete("/sessions/:id", verifyToken, isTrainer, deleteSession);

module.exports = router;
