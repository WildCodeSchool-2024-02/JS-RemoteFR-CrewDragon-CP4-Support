const {
	create,
	getAll,
	getById,
	update,
	destroy,
	join,
} = require("../models/sessionModel");

const createSession = async (req, res, next) => {
	try {
		const session = await create(req.body);
		res.status(201).send(session);
	} catch (error) {
		next(error);
	}
};

const getSessions = async (req, res, next) => {
	try {
		const sessions = await getAll();
		res.status(200).send(sessions);
	} catch (error) {
		next(error);
	}
};

const getSessionById = async (req, res, next) => {
	try {
		const session = await getById(+req.params.id);
		if (!session) {
			return res.status(404).send({ message: "Session not found" });
		}
		res.status(200).send(session);
	} catch (error) {
		next(error);
	}
};

const updateSession = async (req, res, next) => {
	try {
		const session = await update(+req.params.id, req.body);
		res.status(200).send(session);
	} catch (error) {
		next(error);
	}
};

const deleteSession = async (req, res, next) => {
	try {
		const session = await destroy(+req.params.id);
		res.status(200).send(session);
	} catch (error) {
		next(error);
	}
};

const joinSession = async (req, res, next) => {
	try {
		const session = await getById(+req.params.id);
		if (!session) {
			return res.status(404).send({ message: "Session not found" });
		}
		await join(+req.params.id, req.user.id);
		res.status(200).send(session);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createSession,
	getSessions,
	getSessionById,
	updateSession,
	deleteSession,
	joinSession,
};
