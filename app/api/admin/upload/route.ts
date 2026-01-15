import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { uploadImage } from '@/lib/imageStorage'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
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

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Upload using hybrid storage system
    const result = await uploadImage(file)

    return NextResponse.json({ url: result.url, filename: result.filename })
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Provide more specific error messages
    if (error.message?.includes('token') || error.message?.includes('unauthorized')) {
      return NextResponse.json(
        { 
          error: 'Invalid BLOB_READ_WRITE_TOKEN. Using local storage instead. Check your .env.local file.',
          details: error.message
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Upload failed',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
