require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");

app.use(
	cors({
		origin: [process.env.CLIENT_URL],
	})
);

app.use(express.json());

app.use("/api", router);

const logErrors = (err, req, res, next) => {
	console.error(err);
	console.error("on req:", req.method, req.path);

	next(err);
};

app.use(logErrors);

module.exports = app;
