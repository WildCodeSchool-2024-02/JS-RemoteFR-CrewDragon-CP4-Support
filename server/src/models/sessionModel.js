const prisma = require("../db/prisma");

/**
 * CRUD with Prisma for sessions
 */

// Create
const create = async (session) => {
	const { users, ...rest } = session;
	return await prisma.session.create({
		data: {
			...rest,
			users: {
				connect: {
					id: users,
				},
			},
		},
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
	return await prisma.session.findMany({
		include: {
			users: {
				select: {
					id: true,
					email: true,
					name: true,
					role: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};

// Update
const update = async (id, session) => {
	const { users, ...rest } = session;
	return await prisma.session.update({
		where: { id },
		data: {
			...rest,
			users: {
				connect: {
					id: users,
				},
			},
		},
	});
};

// Delete
const destroy = async (id) => {
	return await prisma.session.delete({
		where: { id },
	});
};

// Join Session

const join = async (id, user) => {
	return await prisma.session.update({
		where: { id },
		data: {
			users: {
				connect: {
					id: user,
				},
			},
		},
	});
};

const userWithSessions = async (id) => {
	return await prisma.user.findUnique({
		where: { id },
		include: {
			sessions: true,
		},
	});
};

module.exports = {
	create,
	getById,
	getAll,
	update,
	destroy,
	join,
	userWithSessions,
};
