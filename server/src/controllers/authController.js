const { create } = require("../models/userModel");
const { generateToken } = require("../middleware/jwt");

const login = (req, res, next) => {
	const token = generateToken(req.user);
	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "strict",
	});
	res.status(200).json({
		name: req.user.name,
		email: req.user.email,
		role: req.user.role,
	});
};

const register = async (req, res, next) => {
	try {
		const user = await create(req.body);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};

const logout = (req, res, next) => {
	res.clearCookie("token");
	res.status(200).send("Déconnexion réussie");
};

module.exports = {
	login,
	register,
	logout,
};
