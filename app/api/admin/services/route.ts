import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isSessionValid, type AdminSession } from '@/lib/auth'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'services.json')

async function getServices() {
  try {
    const file = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(file)
    // Ensure it's an array
    return Array.isArray(data) ? data : []
  } catch (error) {
    // Fallback to default data
    try {
      const { services } = await import('@/data/services')
      return services
    } catch {
      return []
    }
  }
}

async function saveServices(services: any[]) {
  await writeFile(DATA_FILE, JSON.stringify(services, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const services = await getServices()
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load services' },
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

    const newService = await request.json()
    const services = await getServices()
    services.push(newService)
    await saveServices(services)

    return NextResponse.json({ success: true, service: newService })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create service' },
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
    const services = await getServices()
    const index = services.findIndex((s: any) => s.slug === updatedService.slug)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    services[index] = updatedService
    await saveServices(services)

    return NextResponse.json({ success: true, service: updatedService })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update service' },
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

    const services = await getServices()
    const filtered = services.filter((s: any) => s.slug !== slug)
    await saveServices(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}
