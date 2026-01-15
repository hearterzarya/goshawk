import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow login page and API routes
  if (
    request.nextUrl.pathname.startsWith('/admin/login') ||
    request.nextUrl.pathname.startsWith('/api/admin/login') ||
    request.nextUrl.pathname.startsWith('/api/admin/check-auth')
  ) {
    return NextResponse.next()
  }

  // Protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const sessionData = JSON.parse(session.value)
      const expiresAt = sessionData.expiresAt || 0
      
      if (Date.now() > expiresAt) {
        // Session expired
        const response = NextResponse.redirect(new URL('/admin/login', request.url))
        response.cookies.delete('admin_session')
        return response
      }
    } catch (error) {
      // Invalid session
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
