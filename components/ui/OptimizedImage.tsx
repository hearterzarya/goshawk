'use client'

import Image from 'next/image'
import { normalizeImageUrl, isExternalUrl } from '@/lib/imageUtils'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

/**
 * Optimized Image component that handles both local and Vercel Blob URLs
 * Automatically uses unoptimized for external URLs and optimized for local paths
 */
export function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  objectFit = 'cover',
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Don't render if src is empty or invalid
  if (!src || src.trim() === '' || src === 'null' || src === 'undefined') {
    return (
      <div
        className={`bg-navy-100 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <span className="text-navy-400 text-sm">No image</span>
      </div>
    )
  }
  
  const normalizedSrc = normalizeImageUrl(src)
  const isExternal = isExternalUrl(normalizedSrc)
  
  // If image fails to load, show placeholder
  if (error) {
    return (
      <div
        className={`bg-navy-100 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <span className="text-navy-400 text-sm">Image not available</span>
      </div>
    )
  }

  // For database images (/api/images/), use unoptimized since they're served dynamically
  // For external URLs, also use unoptimized
  const useUnoptimized = isExternal || normalizedSrc.startsWith('/api/images/')
  
  if (fill) {
    return (
      <>
        {loading && (
          <div
            className={`bg-navy-100 flex items-center justify-center ${className}`}
            style={{ position: 'absolute', inset: 0 }}
          >
            <span className="text-navy-400 text-sm">Loading...</span>
          </div>
        )}
        <Image
          src={normalizedSrc}
          alt={alt}
          fill
          className={className}
          priority={priority}
          unoptimized={useUnoptimized}
          onLoad={() => setLoading(false)}
          onError={(e) => {
            console.error('Image load error:', normalizedSrc, e)
            setError(true)
            setLoading(false)
          }}
          style={{ objectFit }}
          {...props}
        />
      </>
    )
  }

  return (
    <>
      {loading && (
        <div
          className={`bg-navy-100 flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          <span className="text-navy-400 text-sm">Loading...</span>
        </div>
      )}
      <Image
        src={normalizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        unoptimized={useUnoptimized}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          console.error('Image load error:', normalizedSrc, e)
          setError(true)
          setLoading(false)
        }}
        style={{ objectFit }}
        {...props}
      />
    </>
  )
}
