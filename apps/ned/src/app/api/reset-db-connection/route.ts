import { createFreshPrismaClient } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const freshClient = createFreshPrismaClient()

    // Execute a simple query to test connection
    await freshClient.$queryRaw`SELECT 1`

    // Disconnect immediately
    await freshClient.$disconnect()

    console.log('Database connection reset successfully')

    return NextResponse.json({ success: true, message: 'Connection reset' })
  } catch (error) {
    console.error('Error resetting database connection:', error)

    return NextResponse.json(
      { error: 'Failed to reset connection' },
      { status: 500 }
    )
  }
}
