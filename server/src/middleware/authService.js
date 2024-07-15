const argon2 = require("argon2");
const { getByEmail } = require("../models/userModel");
const hashingOptions = {
	type: argon2.argon2id,
	memoryCost: 19 * 2 ** 10,
	timeCost: 2,
	parallelism: 1,
};

const hashPassword = async (req, res, next) => {
	try {
		const hashedPassword = await argon2.hash(
			req.body.password,
			hashingOptions
		);
		delete req.body.password;
		req.body.password = hashedPassword;
		next();
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const verifyPassword = async (req, res, next) => {
	const { password, email } = req.body;

	if (!password) {
		return res.status(400).send({ message: "Password is required" });
	}

	const user = await getByEmail(email);

	try {
		const isPasswordValid = await argon2.verify(user.password, password);
		if (isPasswordValid) {
			delete user.password;
			req.user = user;
			next();
		} else {
			res.status(400).send({ message: "Invalid Password" });
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

module.exports = { hashPassword, verifyPassword };
