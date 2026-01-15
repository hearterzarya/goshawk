import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false })
    }

    const session: AdminSession = JSON.parse(sessionCookie.value)
    
    if (isSessionValid(session)) {
      return NextResponse.json({ authenticated: true, session })
    }

    // Invalid session, clear cookie
    cookieStore.delete('admin_session')
    return NextResponse.json({ authenticated: false })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}
