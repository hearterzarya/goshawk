import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session: AdminSession = JSON.parse(sessionCookie.value)
    if (!isSessionValid(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    
    try {
      const files = await readdir(uploadsDir)
      const images = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/uploads/${file}`)
      
      return NextResponse.json({ images })
    } catch (error) {
      // Directory doesn't exist or is empty
      return NextResponse.json({ images: [] })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}
