import { PrismaClient } from '@prisma/client'

// Singleton Prisma optimisé pour Vercel Serverless
let prisma: PrismaClient

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  // En production (Vercel), nouvelle instance à chaque invocation
  prisma = new PrismaClient({
    log: ['error']
  })
} else {
  // En dev, réutilise l'instance globale
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ['query', 'error', 'warn']
    })
  }
  prisma = global.__prisma
}

export default prisma

