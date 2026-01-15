import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'testimonials.json')

async function getTestimonials() {
  try {
    const file = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(file)
    // Ensure it's an array
    return Array.isArray(data) ? data : []
  } catch (error) {
    // Fallback to default data
    try {
      const { testimonials } = await import('@/data/testimonials')
      return testimonials
    } catch {
      return []
    }
  }
}

async function saveTestimonials(testimonials: any[]) {
  await writeFile(DATA_FILE, JSON.stringify(testimonials, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    const newTestimonial = await request.json()
    const testimonials = await getTestimonials()
    testimonials.push(newTestimonial)
    await saveTestimonials(testimonials)

    return NextResponse.json({ success: true, testimonial: newTestimonial })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
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

    const updatedTestimonial = await request.json()
    const testimonials = await getTestimonials()
    const index = testimonials.findIndex((t: any) => t.id === updatedTestimonial.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    testimonials[index] = updatedTestimonial
    await saveTestimonials(testimonials)

    return NextResponse.json({ success: true, testimonial: updatedTestimonial })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const testimonials = await getTestimonials()
    const filtered = testimonials.filter((t: any) => t.id !== id)
    await saveTestimonials(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
