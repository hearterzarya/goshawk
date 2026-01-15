/**
 * Hybrid image storage system
 * Works with both local file system (development) and Vercel Blob (production)
 */

import { writeFile, readdir, unlink, mkdir } from 'fs/promises'
import { join } from 'path'

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads')

// Check if Vercel Blob is available
function isBlobAvailable(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

/**
 * Upload an image - uses Blob if available, otherwise local file system
 */
export async function uploadImage(file: File): Promise<{ url: string; filename: string }> {
  if (isBlobAvailable()) {
    // Use Vercel Blob
    try {
      const { put } = await import('@vercel/blob')
      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `uploads/${timestamp}-${originalName}`

      const blob = await put(filename, file, {
        access: 'public',
        contentType: file.type,
      })

      return { url: blob.url, filename }
    } catch (error: any) {
      // If Blob fails, fallback to local storage
      console.warn('Vercel Blob upload failed, using local storage:', error.message)
      // Continue to local storage fallback below
    }
  }
  
  // Use local file system (fallback or when Blob not available)
  const timestamp = Date.now()
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const filename = `${timestamp}-${originalName}`

  // Ensure uploads directory exists
  try {
    await mkdir(UPLOADS_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filepath = join(UPLOADS_DIR, filename)

  await writeFile(filepath, buffer)

  return { url: `/uploads/${filename}`, filename }
}

/**
 * List all images - works with both storage types
 */
export async function listImages(): Promise<string[]> {
  if (isBlobAvailable()) {
    // Use Vercel Blob
    try {
      const { list } = await import('@vercel/blob')
      const { blobs } = await list({
        prefix: 'uploads/',
      })

      return blobs
        .filter(blob => {
          const extension = blob.pathname.split('.').pop()?.toLowerCase()
          return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension || '')
        })
        .map(blob => blob.url)
    } catch (error: any) {
      // If Blob fails, fallback to local storage
      console.warn('Vercel Blob list failed, using local storage:', error.message)
      // Continue to local storage fallback below
    }
  }
  
  // Use local file system (fallback or when Blob not available)
  try {
    await mkdir(UPLOADS_DIR, { recursive: true })
    const files = await readdir(UPLOADS_DIR)
    return files
      .filter(file => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file))
      .map(file => `/uploads/${file}`)
  } catch (error) {
    return []
  }
}

/**
 * Delete an image - works with both storage types
 */
export async function deleteImage(url: string): Promise<void> {
  if (isBlobAvailable() && url.startsWith('http') && url.includes('blob.vercel-storage.com')) {
    // Use Vercel Blob - URL is the full blob URL
    try {
      const { del } = await import('@vercel/blob')
      await del(url)
      return
    } catch (error: any) {
      // If Blob delete fails, try local storage as fallback
      console.warn('Vercel Blob delete failed, trying local storage:', error.message)
      // Continue to local storage fallback below
    }
  }
  
  // Use local file system (fallback or when Blob not available)
  // Extract filename from URL
  const filename = url.replace('/uploads/', '').split('/').pop() || url
  const filepath = join(UPLOADS_DIR, filename)
  try {
    await unlink(filepath)
  } catch (error) {
    // File might not exist, ignore
  }
}

/**
 * Check if a URL is a Vercel Blob URL
 */
export function isBlobUrl(url: string): boolean {
  return url.startsWith('http') && url.includes('blob.vercel-storage.com')
}

/**
 * Normalize image URL - handles both local and blob URLs
 */
export function normalizeImageUrl(url: string): string {
  // If it's already a full URL (blob or external), return as is
  if (url.startsWith('http')) {
    return url
  }
  // If it's a local path, return as is
  if (url.startsWith('/')) {
    return url
  }
  // Otherwise, assume it's a local upload
  return url.startsWith('/uploads/') ? url : `/uploads/${url}`
}
