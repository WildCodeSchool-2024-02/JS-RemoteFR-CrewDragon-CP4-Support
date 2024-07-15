const prisma = require("../db/prisma");

/**
 * CRUD with Prisma
 */

// Create
const create = async (user) => {
	return await prisma.user.create({
		data: user,
	});
};

// Read One
const getById = async (id) => {
	return await prisma.user.findUnique({
		where: { id },
	});
};

// Read All
const getAll = async () => {
	return await prisma.user.findMany();
};

// Update
const update = async (id, user) => {
	return await prisma.user.update({
		where: { id },
		data: user,
	});
};

// Delete
const destroy = async (id) => {
	return await prisma.user.delete({
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
