import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { uploadImage } from '@/lib/db/images'

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

    // Upload to database
    const result = await uploadImage(file)

    return NextResponse.json({ url: result.url, filename: result.url.split('/').pop() || '' })
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Provide more specific error messages
    if (error.message?.includes('DATABASE_URL') || error.message?.includes('database')) {
      return NextResponse.json(
        { 
          error: 'Database connection error. Please check your DATABASE_URL in .env.local',
          details: error.message
        },
        { status: 500 }
      )
    }
    
    if (error.message?.includes('bytea') || error.message?.includes('BYTEA')) {
      return NextResponse.json(
        { 
          error: 'Image storage error. Please ensure the images table exists in your database.',
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
