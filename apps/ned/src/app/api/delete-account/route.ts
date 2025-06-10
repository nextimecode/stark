import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { env } from '@/env'
import { createClient } from '@/lib/supabase/server'

const allowedOrigins = [
  env.NEXT_PUBLIC_ARYA_URL,
  env.NEXT_PUBLIC_BRAN_URL,
  env.NEXT_PUBLIC_SANSA_URL,
  env.NEXT_PUBLIC_NED_URL,
].filter(Boolean)

const setCorsHeaders = (origin: string | null, response: NextResponse) => {
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
}

export async function OPTIONS(request: Request) {
  const response = NextResponse.json({})

  const origin = request.headers.get('origin')
  setCorsHeaders(origin, response)

  return response
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient({ admin: true })
    const token = (await cookies()).get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      )
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      )
    }

    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id)

    if (deleteError) {
      console.error('Error deleting user from Supabase:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete user from database' },
        { status: 500 }
      )
    }

    const response = NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    })

    response.cookies.set('token', '', {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    })

    const origin = request.headers.get('origin')
    setCorsHeaders(origin, response)

    return response
  } catch (error) {
    console.error('Error in delete-account endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
