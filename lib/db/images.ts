/**
 * Image storage in Neon Database
 * All images are stored as BYTEA in the database
 */

import { sql } from './index'

export interface ImageRecord {
  id: number
  filename: string
  originalName: string
  mimeType: string
  data: Buffer
  size: number
  url: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Upload image to database
 */
export async function uploadImage(file: File): Promise<{ url: string; id: number }> {
  // Check database is available
  if (!sql) {
    throw new Error('DATABASE_URL not configured - database connection unavailable')
  }
  
  const timestamp = Date.now()
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const filename = `${timestamp}-${originalName}`
  const url = `/api/images/${filename}`
  
  // Convert file to buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Insert into database (BYTEA column)
  // For Neon, we need to use hex format: \x + hex string
  try {
    const hexString = buffer.toString('hex')
    
    // Use raw SQL with hex format for BYTEA
    // Neon's sql template literal needs the hex string in PostgreSQL format
    const result = await sql`
      INSERT INTO images (filename, original_name, mime_type, data, size, url)
      VALUES (
        ${filename}, 
        ${file.name}, 
        ${file.type}, 
        decode(${hexString}, 'hex'), 
        ${file.size}, 
        ${url}
      )
      RETURNING id, url
    `
    
    if (!result || result.length === 0) {
      throw new Error('No result returned from database insert')
    }
    
    return {
      id: result[0].id,
      url: result[0].url,
    }
  } catch (error: any) {
    console.error('Database upload error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      name: error.name,
    })
    
    throw new Error(`Failed to upload image to database: ${error.message}`)
  }
}

/**
 * Get image by URL or filename
 */
export async function getImage(urlOrFilename: string): Promise<ImageRecord | null> {
  if (!sql) {
    throw new Error('DATABASE_URL not configured')
  }
  
  try {
    // Extract filename from URL if it's a full URL
    let searchFilename = urlOrFilename
    let searchUrl = urlOrFilename
    
    if (urlOrFilename.startsWith('/api/images/')) {
      searchFilename = urlOrFilename.replace('/api/images/', '')
      searchUrl = urlOrFilename
    }
    
    const result = await sql`
      SELECT 
        id,
        filename,
        original_name as "originalName",
        mime_type as "mimeType",
        encode(data, 'hex') as data_hex,
        size,
        url,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM images
      WHERE url = ${searchUrl} OR filename = ${searchFilename}
      LIMIT 1
    `
    
    if (result.length === 0) {
      console.log(`Image not found for: ${urlOrFilename} (searched as filename: ${searchFilename}, url: ${searchUrl})`)
      return null
    }
    
    const row = result[0]
    
    // Check if data_hex exists and is valid
    if (!row.data_hex) {
      console.error('Image data_hex is null or undefined')
      return null
    }
    
    // Convert hex string back to Buffer
    const imageData = Buffer.from(row.data_hex, 'hex')
    
    return {
      id: row.id,
      filename: row.filename,
      originalName: row.originalName,
      mimeType: row.mimeType,
      data: imageData,
      size: row.size,
      url: row.url,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    } as ImageRecord
  } catch (error: any) {
    console.error('Error in getImage:', error)
    console.error('Searching for:', urlOrFilename)
    throw error
  }
}

/**
 * List all images
 */
export async function listImages(): Promise<Array<{ id: number; url: string; filename: string; originalName: string; size: number; createdAt: Date }>> {
  if (!sql) {
    throw new Error('DATABASE_URL not configured')
  }
  
  const result = await sql`
    SELECT 
      id,
      url,
      filename,
      original_name as "originalName",
      size,
      created_at as "createdAt"
    FROM images
    ORDER BY created_at DESC
  `
  
  return result
}

/**
 * Delete image by URL or ID
 */
export async function deleteImage(urlOrId: string | number): Promise<void> {
  if (!sql) {
    throw new Error('DATABASE_URL not configured')
  }
  
  if (typeof urlOrId === 'number') {
    await sql`DELETE FROM images WHERE id = ${urlOrId}`
  } else {
    await sql`DELETE FROM images WHERE url = ${urlOrId} OR filename = ${urlOrId}`
  }
}

/**
 * Get image count
 */
export async function getImageCount(): Promise<number> {
  if (!sql) {
    throw new Error('DATABASE_URL not configured')
  }
  
  const result = await sql`SELECT COUNT(*) as count FROM images`
  return parseInt(result[0].count) || 0
}
