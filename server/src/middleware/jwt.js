const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign(user, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];

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

const isTrainer = (req, res, next) => {
	if (req.user.role === "TRAINER") {
		next();
	} else {
		res.status(403).send({ message: "Unauthorized" });
	}
};

module.exports = {
	generateToken,
	verifyToken,
	isTrainer,
};
