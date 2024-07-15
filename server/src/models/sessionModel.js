const prisma = require("../db/prisma");

/**
 * CRUD with Prisma for sessions
 */

// Create
const create = async (session) => {
	return await prisma.session.create({
		data: session,
	});
};

// Read One
const getById = async (id) => {
	return await prisma.session.findUnique({
		where: { id },
	});
};

// Read All
const getAll = async () => {
	return await prisma.session.findMany();
};

// Update
const update = async (id, session) => {
	return await prisma.session.update({
		where: { id },
		data: session,
	});
};

// Delete
const destroy = async (id) => {
	return await prisma.session.delete({
		where: { id },
	});
};

module.exports = {
	create,
	getById,
	getAll,
	update,
	destroy,
};
