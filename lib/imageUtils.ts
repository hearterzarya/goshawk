/**
 * Client-side image URL utilities
 * Simplified - all images are now served from database
 */

/**
 * Normalize image URL - all images are served from /api/images/
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return ''
  
  // If it's already a full URL (external), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // If it's already our API path, return as is
  if (url.startsWith('/api/images/')) {
    return url
  }
  
  // If it's a filename, prepend API path
  if (url && !url.startsWith('/')) {
    return `/api/images/${url}`
  }
  
  // Return as is for other paths
  return url
}

/**
 * Check if URL is external (not from our database)
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}
