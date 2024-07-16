const prisma = require("../db/prisma");

/**
 * CRUD with Prisma for support
 */

// Create
const create = async (support) => {
	return await prisma.support.create({
		data: support,
	});
};

// Read One
const getById = async (id) => {
	return await prisma.support.findUnique({
		where: { id },
	});
};

// Read All
const getAll = async () => {
	return await prisma.support.findMany({
		include: {
			user: {
				select: {
					id: true,
					name: true,
				},
			},
			session: {
				select: {
					id: true,
					title: true,
				},
			},
		},
	});
};

// Update
const update = async (id, support) => {
	return await prisma.support.update({
		where: { id },
		data: support,
	});
};

// Delete
const destroy = async (id) => {
	return await prisma.support.delete({
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
