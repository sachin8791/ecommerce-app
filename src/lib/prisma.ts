import { PrismaClient } from '@prisma/client';
import { memoryDB } from './memory-db';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use memory DB for Vercel deployment, Prisma for local development
export const prisma = process.env.NODE_ENV === 'production' ? memoryDB as any : (globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Initialize database connection
prisma.$connect?.().catch((error: Error) => {
  console.error('Failed to connect to database:', error);
});
