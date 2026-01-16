/**
 * Serve images from database
 */
import { NextRequest, NextResponse } from 'next/server'
import { getImage } from '@/lib/db/images'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename
    
    if (!filename) {
      return new NextResponse('Filename required', { status: 400 })
    }

    const image = await getImage(filename)
    
    if (!image) {
      return new NextResponse('Image not found', { status: 404 })
    }

    // Return image with proper headers
    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(image.data)
    
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': image.mimeType,
        'Content-Length': image.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error: any) {
    console.error('Image serve error:', error)
    return new NextResponse('Error serving image', { status: 500 })
  }
}
