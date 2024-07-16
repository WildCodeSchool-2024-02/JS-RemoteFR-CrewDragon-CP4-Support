const { PrismaClient } = require("@prisma/client");

const opt = {
	errorFormat: "pretty",
	log: ["warn", "error"],
};

const prisma = new PrismaClient(opt);

module.exports = prisma;
