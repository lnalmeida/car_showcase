const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany();
  const info = await prisma.dealershipInfo.findMany();
  console.log("USERS:", JSON.stringify(users, null, 2));
  console.log("DEALERSHIP_INFO:", JSON.stringify(info, null, 2));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
