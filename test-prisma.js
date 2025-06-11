const { PrismaClient } = require("./src/generated/prisma");

const client = new PrismaClient();
console.log("Prisma funcionando!");
