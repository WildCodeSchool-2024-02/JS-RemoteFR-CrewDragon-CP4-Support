const {
	create,
	getAll,
	getById,
	update,
	destroy,
} = require("../models/supportModel");

const createSupport = async (req, res, next) => {
	try {
		const session = await create(req.body);
		res.status(201).send(session);
	} catch (error) {
		next(error);
	}
};

const getSupports = async (req, res, next) => {
	try {
		const sessions = await getAll();
		res.status(200).send(sessions);
	} catch (error) {
		next(error);
	}
};

const getSupportById = async (req, res, next) => {
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

const updateSupport = async (req, res, next) => {
	try {
		const session = await update(+req.params.id, req.body);
		res.status(200).send(session);
	} catch (error) {
		next(error);
	}
};

const deleteSupport = async (req, res, next) => {
	try {
		const session = await destroy(+req.params.id);
		res.status(200).send(session);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createSupport,
	getSupports,
	getSupportById,
	updateSupport,
	deleteSupport,
};
