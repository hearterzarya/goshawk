/**
 * Migration script to move JSON data to Neon DB
 * Run this once after setting up Neon DB: npm run migrate
 */

import { readFile } from 'fs/promises'
import { join } from 'path'
import { servicesDb, testimonialsDb, homeContentDb, aboutContentDb, contactContentDb, initDatabase } from '../lib/db/index'

async function migrate() {
  console.log('Starting migration to Neon DB...')
  
  try {
    // Initialize database schema
    console.log('Initializing database schema...')
    await initDatabase()
    console.log('✓ Schema initialized')
    
    // Migrate Services
    console.log('Migrating services...')
    try {
      const servicesPath = join(process.cwd(), 'data', 'services.json')
      const servicesData = JSON.parse(await readFile(servicesPath, 'utf-8'))
      
      for (const service of servicesData) {
        await servicesDb.create(service)
      }
      console.log(`✓ Migrated ${servicesData.length} services`)
    } catch (error) {
      console.warn('⚠ Services migration failed:', error)
    }
    
    // Migrate Testimonials
    console.log('Migrating testimonials...')
    try {
      const testimonialsPath = join(process.cwd(), 'data', 'testimonials.json')
      const testimonialsData = JSON.parse(await readFile(testimonialsPath, 'utf-8'))
      
      for (const testimonial of testimonialsData) {
        await testimonialsDb.create(testimonial)
      }
      console.log(`✓ Migrated ${testimonialsData.length} testimonials`)
    } catch (error) {
      console.warn('⚠ Testimonials migration failed:', error)
    }
    
    // Migrate Home Content
    console.log('Migrating home content...')
    try {
      const homePath = join(process.cwd(), 'data', 'home-content.json')
      const homeData = JSON.parse(await readFile(homePath, 'utf-8'))
      await homeContentDb.update(homeData)
      console.log('✓ Migrated home content')
    } catch (error) {
      console.warn('⚠ Home content migration failed:', error)
    }
    
    // Migrate About Content
    console.log('Migrating about content...')
    try {
      const aboutPath = join(process.cwd(), 'data', 'about-content.json')
      const aboutData = JSON.parse(await readFile(aboutPath, 'utf-8'))
      await aboutContentDb.update(aboutData)
      console.log('✓ Migrated about content')
    } catch (error) {
      console.warn('⚠ About content migration failed:', error)
    }
    
    // Migrate Contact Content
    console.log('Migrating contact content...')
    try {
      const contactPath = join(process.cwd(), 'data', 'contact-content.json')
      const contactData = JSON.parse(await readFile(contactPath, 'utf-8'))
      await contactContentDb.update(contactData)
      console.log('✓ Migrated contact content')
    } catch (error) {
      console.warn('⚠ Contact content migration failed:', error)
    }
    
    console.log('\n✅ Migration completed successfully!')
    console.log('\nNote: Your JSON files are still in the /data folder as backup.')
    console.log('You can now update your API routes to use Neon DB instead of JSON files.')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrate()
