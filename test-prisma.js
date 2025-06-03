const { PrismaClient } = require("./prisma/src/generated/prisma");

const client = new PrismaClient();
console.log("Prisma funcionando!");