import { NextResponse } from 'next/server'
import { list } from '@vercel/blob'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'

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

    // List all blobs in the uploads folder
    const { blobs } = await list({
      prefix: 'uploads/',
    })

    // Filter for images only and extract URLs
    const images = blobs
      .filter(blob => {
        const extension = blob.pathname.split('.').pop()?.toLowerCase()
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension || '')
      })
      .map(blob => blob.url)

    return NextResponse.json({ images })
  } catch (error) {
    console.error('List images error:', error)
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}
