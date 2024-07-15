const login = (req, res, next) => {
	res.send("Login route");
};

const register = (req, res, next) => {
	res.send("Register route");
};

module.exports = {
	login,
	register,
};
