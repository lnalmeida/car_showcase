import { PrismaClient } from '../src/generated/prisma';

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}


//globaThis.prisma: This is a global variable that ensure that
// the PrismaClient instance is available in all parts of the application
// and is reused across hot reloads in development. Without this, each time your
// application is reloaded, a new PrismaClient instance will be created,
// leading to potential issues with data consistency and performance.
