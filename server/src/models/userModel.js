const prisma = require("../db/prisma");
const { get } = require("../routes/routes");

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

// Read Email
const getByEmail = async (email) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
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
	getByEmail,
	getAll,
	update,
	destroy,
};
