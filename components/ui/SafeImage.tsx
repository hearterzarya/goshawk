'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallback?: React.ReactNode
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  fallback,
}: SafeImageProps) {
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  // Handle image errors
  const handleError = () => {
    setError(true)
  }

  // If error, show fallback
  if (error && fallback) {
    return <>{fallback}</>
  }

  // If error and no fallback, show placeholder
  if (error) {
    return (
      <div
        className={`bg-navy-100 flex items-center justify-center ${className || ''}`}
        style={fill ? undefined : { width, height }}
      >
        <span className="text-navy-400 text-sm">Image not available</span>
      </div>
    )
  }

  // Ensure absolute path for local images
  const imageSrc = imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`

  try {
    if (fill) {
      return (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={className}
          onError={handleError}
          priority={priority}
          unoptimized={imageSrc.startsWith('/uploads/')}
        />
      )
    }

    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        priority={priority}
        unoptimized={imageSrc.startsWith('/uploads/')}
      />
    )
  } catch (err) {
    // Fallback if Image component fails
    return (
      <div
        className={`bg-navy-100 flex items-center justify-center ${className || ''}`}
        style={fill ? undefined : { width, height }}
      >
        <span className="text-navy-400 text-sm">Image not available</span>
      </div>
    )
  }
}
