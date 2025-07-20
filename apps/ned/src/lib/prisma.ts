import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  connectionCount: number
  prisma: PrismaClient | undefined
}

// Initialize connection counter
if (!globalForPrisma.connectionCount) {
  globalForPrisma.connectionCount = 0
}

function createPrismaClient() {
  globalForPrisma.connectionCount++

  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Create a fresh client for operations that might have prepared statement conflicts
export function createFreshPrismaClient() {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  })

  globalForPrisma.connectionCount++
  console.log(
    `Created fresh Prisma client (total connections: ${globalForPrisma.connectionCount})`
  )

  return client
}

// Helper function to execute operations with automatic retry on prepared statement errors
export async function executeWithRetry<T>(
  operation: (client: PrismaClient) => Promise<T>,
  maxRetries = 2
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const client = attempt === 0 ? prisma : createFreshPrismaClient()

    try {
      const result = await operation(client)

      // Disconnect fresh client after successful operation
      if (attempt > 0) {
        await client.$disconnect()
        globalForPrisma.connectionCount--
      }

      return result
    } catch (error) {
      lastError = error as Error

      // Disconnect fresh client on error
      if (attempt > 0) {
        await client.$disconnect()
        globalForPrisma.connectionCount--
      }

      // Check if it's a prepared statement error
      if (
        error instanceof Error &&
        (error.message.includes('prepared statement') ||
          error.message.includes('42P05')) &&
        attempt < maxRetries
      ) {
        console.log(
          `Prepared statement error, retrying... (attempt ${attempt + 1}/${maxRetries})`
        )
        await new Promise(resolve => setTimeout(resolve, 100 + attempt * 50))
        continue
      }

      // If it's not a prepared statement error or we've exhausted retries, throw
      throw error
    }
  }

  throw lastError
}

// Helper function to reset connection on prepared statement errors
export async function resetPrismaConnection() {
  try {
    await prisma.$disconnect()
    await new Promise(resolve => setTimeout(resolve, 100))
    await prisma.$connect()
  } catch (error) {
    console.error('Error resetting Prisma connection:', error)
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
