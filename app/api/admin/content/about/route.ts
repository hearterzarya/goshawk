import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

const CONTENT_FILE = join(process.cwd(), 'data', 'about-content.json')

async function getContent() {
  try {
    const file = await readFile(CONTENT_FILE, 'utf-8')
    return JSON.parse(file)
  } catch {
    // Return default content
    return {
      badge: 'About Goshawk',
      headline: 'Building Trust Through Excellence',
      subtext: 'Goshawk Logistics is a premium freight brokerage dedicated to delivering reliable, transparent, and efficient transportation solutions. We connect shippers with verified carriers across North America, ensuring your freight moves safely and on time.',
      missionTitle: 'Our Mission',
      missionParagraph1: 'At Goshawk Logistics, our mission is simple: to make freight shipping seamless, reliable, and transparent. We believe that logistics shouldn\'t be complicated. By combining experienced professionals, verified carrier networks, and modern technology, we deliver solutions that move your business forward.',
      missionParagraph2: 'Whether you\'re shipping a single pallet or managing complex supply chains, we\'re here to provide the expertise, support, and reliability you need. Our commitment to excellence drives everything we do, from carrier selection to customer service.',
      heroImage: '',
      missionImage: '',
      valuesTitle: 'Our Values',
      valuesSubtext: 'The principles that guide everything we do',
      ctaTitle: 'Let\'s Work Together',
      ctaText: 'Ready to experience the Goshawk difference? Get in touch with our team today.',
      values: [
        { title: 'Reliability', description: 'We build our reputation on consistent, on-time delivery and transparent communication.' },
        { title: 'Excellence', description: 'Every shipment matters. We maintain the highest standards in carrier selection and service quality.' },
        { title: 'Partnership', description: 'We view every relationship as a long-term partnership, not just a transaction.' },
        { title: 'Innovation', description: 'Leveraging technology and best practices to continuously improve our services.' },
      ],
    }
  }
}

async function saveContent(content: any) {
  try {
    // Validate content is valid JSON-serializable
    const jsonString = JSON.stringify(content, null, 2)
    await writeFile(CONTENT_FILE, jsonString, 'utf-8')
  } catch (error: any) {
    throw new Error(`Failed to write file: ${error.message}`)
  }
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

export const dynamic = 'force-dynamic'

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
    
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data')
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, ignore error
    }
    
    await saveContent(content)

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
