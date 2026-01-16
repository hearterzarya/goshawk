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
  const timestamp = Date.now()
  const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const filename = `${timestamp}-${originalName}`
  const url = `/api/images/${filename}`
  
  // Convert file to buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Insert into database (BYTEA column)
  // Neon handles Buffer automatically for BYTEA columns
  const result = await sql`
    INSERT INTO images (filename, original_name, mime_type, data, size, url)
    VALUES (${filename}, ${file.name}, ${file.type}, ${buffer}::bytea, ${file.size}, ${url})
    RETURNING id, url
  `
  
  return {
    id: result[0].id,
    url: result[0].url,
  }
}

/**
 * Get image by URL or filename
 */
export async function getImage(urlOrFilename: string): Promise<ImageRecord | null> {
  const result = await sql`
    SELECT 
      id,
      filename,
      original_name as "originalName",
      mime_type as "mimeType",
      data,
      size,
      url,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM images
    WHERE url = ${urlOrFilename} OR filename = ${urlOrFilename}
    LIMIT 1
  `
  
  if (result.length === 0) return null
  
  return {
    ...result[0],
    data: Buffer.from(result[0].data),
  } as ImageRecord
}

/**
 * List all images
 */
export async function listImages(): Promise<Array<{ id: number; url: string; filename: string; originalName: string; size: number; createdAt: Date }>> {
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
  const result = await sql`SELECT COUNT(*) as count FROM images`
  return parseInt(result[0].count) || 0
}
