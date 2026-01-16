import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { servicesDb } from '@/lib/db'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Fallback to JSON if DB fails
async function getServicesFallback() {
  try {
    const file = await readFile(join(process.cwd(), 'data', 'services.json'), 'utf-8')
    const data = JSON.parse(file)
    return Array.isArray(data) ? data : []
  } catch {
    try {
      const { services } = await import('@/data/services')
      return services
    } catch {
      return []
    }
  }
}

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const services = await servicesDb.getAll()
    return NextResponse.json(services)
  } catch (error) {
    console.error('DB error, falling back to JSON:', error)
    // Fallback to JSON if DB is not available
    const services = await getServicesFallback()
    return NextResponse.json(services)
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

    const newService = await request.json()
    await servicesDb.create(newService)

    return NextResponse.json({ success: true, service: newService })
  } catch (error: any) {
    console.error('Create service error:', error)
    return NextResponse.json(
      { error: 'Failed to create service', details: error.message },
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

    const updatedService = await request.json()
    const existing = await servicesDb.getBySlug(updatedService.slug)
    
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    await servicesDb.update(updatedService)

    return NextResponse.json({ success: true, service: updatedService })
  } catch (error: any) {
    console.error('Update service error:', error)
    return NextResponse.json(
      { error: 'Failed to update service', details: error.message },
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
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 })
    }

    await servicesDb.delete(slug)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete service error:', error)
    return NextResponse.json(
      { error: 'Failed to delete service', details: error.message },
      { status: 500 }
    )
  }
}
