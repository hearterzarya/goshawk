/**
 * Serve images from database
 */
import { NextRequest, NextResponse } from 'next/server'
import { getImage } from '@/lib/db/images'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> | { filename: string } }
) {
  try {
    // Handle both sync and async params (Next.js 14+)
    const resolvedParams = await Promise.resolve(params)
    const filename = resolvedParams.filename
    
    if (!filename) {
      return new NextResponse('Filename required', { status: 400 })
    }

    // Try to get image by filename first, then by full URL
    let image = await getImage(filename)
    
    // If not found by filename, try with full URL format
    if (!image && !filename.startsWith('/api/images/')) {
      image = await getImage(`/api/images/${filename}`)
    }
    
    if (!image) {
      console.error(`Image not found in database: ${filename}`)
      return new NextResponse('Image not found', { 
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        }
      })
    }

    // Validate image data
    if (!image.data || image.data.length === 0) {
      console.error(`Image data is empty: ${filename}`)
      return new NextResponse('Image data is empty', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        }
      })
    }

    // Return image with proper headers
    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(image.data)
    
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': image.mimeType || 'image/jpeg',
        'Content-Length': image.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error: any) {
    console.error('Image serve error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    })
    return new NextResponse(`Error serving image: ${error.message}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      }
    })
  }
}
