import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { contactContentDb } from '@/lib/db'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Fallback to JSON if DB fails
async function getContentFallback() {
  try {
    const file = await readFile(join(process.cwd(), 'data', 'contact-content.json'), 'utf-8')
    return JSON.parse(file)
  } catch {
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

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const content = await contactContentDb.get()
    if (content) {
      return NextResponse.json(content)
    }
    // If no content in DB, try fallback
    const fallbackContent = await getContentFallback()
    return NextResponse.json(fallbackContent)
  } catch (error) {
    console.error('DB error, falling back to JSON:', error)
    const content = await getContentFallback()
    return NextResponse.json(content)
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const session: AdminSession = JSON.parse(sessionCookie.value)
    if (!isSessionValid(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    let content
    try {
      const body = await request.text()
      if (!body || body.trim() === '') {
        return NextResponse.json(
          { error: 'Request body is empty' },
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
      content = JSON.parse(body)
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body', details: error.message },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    await contactContentDb.update(content)

    return NextResponse.json(
      { success: true, content }, 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error: any) {
    console.error('Save content error:', error)
    // Always return valid JSON, even on error
    return NextResponse.json(
      { 
        error: 'Failed to save content',
        details: error?.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
