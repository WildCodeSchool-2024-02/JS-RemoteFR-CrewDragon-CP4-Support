const { create } = require("../models/userModel");
const { generateToken } = require("../middleware/jwt");

const login = (req, res, next) => {
	const token = generateToken(req.user);
	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "strict",
	});
	res.status(200).json({ message: "Login successful" });
};

const register = async (req, res, next) => {
	try {
		const user = await create(req.body);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login,
	register,
};
