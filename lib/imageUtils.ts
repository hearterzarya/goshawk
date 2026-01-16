/**
 * Client-side image URL utilities
 * These functions work in both browser and server environments
 */

/**
 * Check if a URL is a Vercel Blob URL
 */
export function isBlobUrl(url: string): boolean {
  if (typeof window === 'undefined') {
    // Server-side check
    return url.startsWith('http') && url.includes('blob.vercel-storage.com')
  }
  // Client-side check
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('blob.vercel-storage.com')
  } catch {
    // If URL parsing fails, check string
    return url.startsWith('http') && url.includes('blob.vercel-storage.com')
  }
}

/**
 * Normalize image URL - handles both local and blob URLs
 * Works on both client and server
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return ''
  
  // If it's already a full URL (blob or external), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // If it's a local path, return as is
  if (url.startsWith('/')) {
    return url
  }
  // Otherwise, assume it's a local upload
  return url.startsWith('/uploads/') ? url : `/uploads/${url}`
}
