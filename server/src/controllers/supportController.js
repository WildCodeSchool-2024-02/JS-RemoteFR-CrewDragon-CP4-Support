const {
	create,
	getAll,
	getById,
	update,
	destroy,
} = require("../models/supportModel");

const createSupport = async (req, res, next) => {
	try {
		const support = await create(req.body);
		res.status(201).send(support);
	} catch (error) {
		next(error);
	}
};

const getSupports = async (req, res, next) => {
	try {
		const supports = await getAll();
		res.status(200).send(supports);
	} catch (error) {
		next(error);
	}
};

const getSupportById = async (req, res, next) => {
	try {
		const support = await getById(+req.params.id);
		if (!support) {
			return res.status(404).send({ message: "support not found" });
		}
		res.status(200).send(support);
	} catch (error) {
		next(error);
	}
};

const updateSupport = async (req, res, next) => {
	try {
		const support = await getById(+req.params);
		if (!support) {
			return res.status(404).send({ message: "support not found" });
		}
		await update(+req.params.id, req.body);
		res.status(200).send(support);
	} catch (error) {
		next(error);
	}
};

const deleteSupport = async (req, res, next) => {
	try {
		const support = await destroy(+req.params.id);
		res.status(200).send(support);
	} catch (error) {
		next(error);
	}
};

const isLike = async (req, res, next) => {
	try {
		const support = await getById(+req.params.id);

		if (!support) {
			return res.status(404).send({ message: "support not found" });
		}
		const like = support.like + 1;
		const updatedSupport = await update(+req.params.id, { like });
		res.status(200).send(updatedSupport);
	} catch (error) {
		next(error);
	}
};
const isUnLike = async (req, res, next) => {
	try {
		const support = await getById(+req.params.id);

		if (!support) {
			return res.status(404).send({ message: "Support not found" });
		}

		if (support.like === 0) {
			return res.status(400).send({ error: "No likes to remove" });
		}
		const like = support.like - 1;
		const updatedSupport = await update(+req.params.id, { like });
		res.status(200).send(updatedSupport);
	} catch (error) {
		next(error);
	}
};

const isDone = async (req, res, next) => {
	try {
		const support = await getById(+req.params.id);

		if (!support) {
			return res.status(404).send({ message: "Support not found" });
		}
		const checked = !support.checked;
		const updatedSupport = await update(+req.params.id, { checked });
		res.status(200).send(updatedSupport);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createSupport,
	getSupports,
	getSupportById,
	updateSupport,
	isLike,
	isUnLike,
	isDone,
	deleteSupport,
};
