const { PrismaClient } = require("./src/src/generated/prisma");

const client = new PrismaClient();
console.log("Prisma funcionando!");
