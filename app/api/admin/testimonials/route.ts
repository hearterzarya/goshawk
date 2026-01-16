import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { testimonialsDb } from '@/lib/db'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Fallback to JSON if DB fails
async function getTestimonialsFallback() {
  try {
    const file = await readFile(join(process.cwd(), 'data', 'testimonials.json'), 'utf-8')
    const data = JSON.parse(file)
    return Array.isArray(data) ? data : []
  } catch {
    try {
      const { testimonials } = await import('@/data/testimonials')
      return testimonials
    } catch {
      return []
    }
  }
}

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const testimonials = await testimonialsDb.getAll()
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('DB error, falling back to JSON:', error)
    const testimonials = await getTestimonialsFallback()
    return NextResponse.json(testimonials)
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
    await testimonialsDb.create(newTestimonial)

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
    const existing = await testimonialsDb.getById(updatedTestimonial.id)
    
    if (!existing) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    await testimonialsDb.update(updatedTestimonial)

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

    await testimonialsDb.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
