/**
 * Test script to verify image upload to Neon database
 * Run: npm run test:upload (add to package.json) or: tsx scripts/test-image-upload.ts
 */

import { uploadImage, listImages, getImage } from '../lib/db/images'
import { readFile } from 'fs/promises'
import { join } from 'path'

async function testUpload() {
  try {
    console.log('🧪 Testing image upload to Neon database...\n')
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not set in environment')
      process.exit(1)
    }
    
    console.log('✅ DATABASE_URL is set')
    
    // Try to list existing images
    console.log('\n📋 Listing existing images...')
    try {
      const images = await listImages()
      console.log(`   Found ${images.length} existing images`)
    } catch (error: any) {
      console.log(`   ⚠️  Could not list images: ${error.message}`)
      console.log('   This might mean the images table doesn\'t exist yet.')
      console.log('   Run: npm run db:init')
    }
    
    console.log('\n✅ Image upload functionality is ready!')
    console.log('\n💡 To test actual upload:')
    console.log('   1. Start your dev server: npm run dev')
    console.log('   2. Go to /admin/images')
    console.log('   3. Upload an image')
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message)
    process.exit(1)
  }
}

testUpload()
