import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'

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

    // Extract filename from URL
    const filename = url.replace('/uploads/', '')
    const filepath = join(process.cwd(), 'public', 'uploads', filename)

    try {
      await unlink(filepath)
      return NextResponse.json({ success: true })
    } catch (error) {
      return NextResponse.json(
        { error: 'File not found or already deleted' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
