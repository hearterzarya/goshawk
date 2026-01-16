import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { aboutContentDb } from '@/lib/db'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Fallback to JSON if DB fails
async function getContentFallback() {
  try {
    const file = await readFile(join(process.cwd(), 'data', 'about-content.json'), 'utf-8')
    return JSON.parse(file)
  } catch {
    return null
  }
}

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const content = await aboutContentDb.get()
    if (content) {
      return NextResponse.json(content)
    }
    // If no content in DB, try fallback
    const fallbackContent = await getContentFallback()
    if (fallbackContent) {
      return NextResponse.json(fallbackContent)
    }
    // Return default if nothing found
    return NextResponse.json({
      badge: 'About Goshawk',
      headline: 'Building Trust Through Excellence',
      subtext: 'Goshawk Logistics is a premium freight brokerage dedicated to delivering reliable, transparent, and efficient transportation solutions.',
      missionTitle: 'Our Mission',
      missionParagraph1: 'At Goshawk Logistics, our mission is simple: to make freight shipping seamless, reliable, and transparent.',
      missionParagraph2: 'We connect shippers with verified carriers across North America.',
      heroImage: '',
      missionImage: '',
      valuesTitle: 'Our Values',
      valuesSubtext: 'The principles that guide everything we do',
      ctaTitle: 'Let\'s Work Together',
      ctaText: 'Ready to experience the Goshawk difference? Get in touch with our team today.',
      values: [],
    })
  } catch (error) {
    console.error('DB error, falling back to JSON:', error)
    const content = await getContentFallback()
    return NextResponse.json(content || {})
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
    
    await aboutContentDb.update(content)

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
