import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { listImages } from '@/lib/db/images'

export const dynamic = 'force-dynamic'

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

    // List images from database
    const imageList = await listImages()
    const images = imageList.map(img => img.url)

    return NextResponse.json({ images })
  } catch (error: any) {
    console.error('List images error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to list images',
        details: error.message || 'Unknown error',
        images: [] // Return empty array on error
      },
      { status: 500 }
    )
  }
}
