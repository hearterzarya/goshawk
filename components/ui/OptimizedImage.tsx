'use client'

import Image from 'next/image'
import { normalizeImageUrl, isBlobUrl } from '@/lib/imageUtils'
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
  const normalizedSrc = normalizeImageUrl(src)
  const isExternal = isBlobUrl(normalizedSrc) || normalizedSrc.startsWith('http')
  
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

  // For external URLs (Blob or other), use unoptimized
  if (isExternal) {
    if (fill) {
      return (
        <Image
          src={normalizedSrc}
          alt={alt}
          fill
          className={className}
          priority={priority}
          unoptimized
          onError={() => setError(true)}
          style={{ objectFit }}
          {...props}
        />
      )
    }
    return (
      <Image
        src={normalizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        unoptimized
        onError={() => setError(true)}
        style={{ objectFit }}
        {...props}
      />
    )
  }

  // For local paths, use optimized Next.js Image
  if (fill) {
    return (
      <Image
        src={normalizedSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={() => setError(true)}
        style={{ objectFit }}
        {...props}
      />
    )
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setError(true)}
      style={{ objectFit }}
      {...props}
    />
  )
}
