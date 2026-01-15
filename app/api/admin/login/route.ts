import { NextResponse } from 'next/server'
import { verifyCredentials, createSession } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    if (verifyCredentials(username, password)) {
      const session = createSession(username)
      
      // Set cookie (in production, use httpOnly, secure cookies)
      const cookieStore = await cookies()
      cookieStore.set('admin_session', JSON.stringify(session), {
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      })

      return NextResponse.json({ success: true, session })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
