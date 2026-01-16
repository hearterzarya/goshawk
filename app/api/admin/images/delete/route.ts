import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { deleteImage } from '@/lib/db/images'

export const dynamic = 'force-dynamic'

export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 })
    }

    try {
      // Delete from database
      await deleteImage(url)
      return NextResponse.json({ success: true })
    } catch (error: any) {
      console.error('Delete error:', error)
      return NextResponse.json(
        { 
          error: 'File not found or already deleted',
          details: error.message
        },
        { status: 404 }
      )
    }
  } catch (error: any) {
    console.error('Delete image error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete image',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
