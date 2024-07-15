const { create } = require("../models/userModel");

const login = (req, res, next) => {
	res.send("Login route");
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
