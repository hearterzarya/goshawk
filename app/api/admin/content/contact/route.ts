import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

const CONTENT_FILE = join(process.cwd(), 'data', 'contact-content.json')

async function getContent() {
  try {
    const file = await readFile(CONTENT_FILE, 'utf-8')
    return JSON.parse(file)
  } catch {
    // Return default content
    return {
      headline: 'Get In Touch',
      subtext: 'Have questions? Need a quote? Our team is here to help. Reach out anytime.',
      formTitle: 'Send Us a Message',
      contactInfo: [
        { label: 'Phone', value: '(800) 555-1234', href: 'tel:+18005551234' },
        { label: 'Email', value: 'info@goshawklogistics.com', href: 'mailto:info@goshawklogistics.com' },
        { label: 'Coverage', value: 'Nationwide (USA, Canada, Mexico)', href: null },
        { label: 'Support', value: '24/7 Dispatch & Tracking', href: null },
      ],
    }
  }
}

async function saveContent(content: any) {
  await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const content = await getContent()
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session: AdminSession = JSON.parse(sessionCookie.value)
    if (!isSessionValid(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const content = await request.json()
    
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data')
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, ignore error
    }
    
    await saveContent(content)

    return NextResponse.json({ success: true, content })
  } catch (error: any) {
    console.error('Save content error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to save content',
        details: error?.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}
