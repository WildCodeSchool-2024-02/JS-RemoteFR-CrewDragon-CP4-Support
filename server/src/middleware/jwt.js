const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).send({ message: "Token is required" });
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.status(401).send({ message: "Invalid Token" });
	}
};

module.exports = {
	generateToken,
	verifyToken,
};
