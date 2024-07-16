const router = require("express").Router();

// Middleware
const { hashPassword, verifyPassword } = require("../middleware/authService");
const { verifyToken, isTrainer } = require("../middleware/jwt");

// Auth routes
const { login, register, logout } = require("../controllers/authController");

router.post("/login", verifyPassword, login);
router.post("/register", hashPassword, register);
router.post("/logout", logout);

// Session routes
const {
	createSession,
	joinSession,
	getSessions,
	getSessionById,
	updateSession,
	deleteSession,
} = require("../controllers/sessionController");

router.post("/sessions", verifyToken, isTrainer, createSession);
router.put("/sessions/:id/join", verifyToken, joinSession);
router.get("/sessions", verifyToken, getSessions);
router.get("/sessions/:id", verifyToken, getSessionById);
router.put("/sessions/:id", verifyToken, isTrainer, updateSession);
router.delete("/sessions/:id", verifyToken, isTrainer, deleteSession);

// Support routes

const {
	createSupport,
	getSupports,
	getSupportById,
	updateSupport,
	isLike,
	isUnLike,
	isDone,
	deleteSupport,
} = require("../controllers/supportController");

router.post("/supports", verifyToken, createSupport);
router.get("/supports", verifyToken, getSupports);
router.get("/supports/:id", verifyToken, getSupportById);
router.put("/supports/:id", verifyToken, updateSupport);
router.delete("/supports/:id", verifyToken, deleteSupport);
router.post("/supports/:id/like", verifyToken, isLike);
router.post("/supports/:id/dislike", verifyToken, isUnLike);
router.post("/supports/:id/is_done", verifyToken, isTrainer, isDone);

module.exports = router;
