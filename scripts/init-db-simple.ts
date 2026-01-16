/**
 * Simple script to initialize Neon Database
 * This uses Neon's SQL execution properly
 */

import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL environment variable is not set')
  process.exit(1)
}

const sql = neon(connectionString)

async function initDatabase() {
  try {
    console.log('🔌 Connecting to Neon database...\n')
    
    // Execute schema statements one by one
    console.log('📝 Creating tables...\n')
    
    // Services table
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        slug VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        short_description TEXT NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(10) NOT NULL,
        image TEXT,
        features JSONB NOT NULL DEFAULT '[]',
        benefits JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('  ✅ services table created')
    
    // Testimonials table
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('  ✅ testimonials table created')
    
    // Home content table
    await sql`
      CREATE TABLE IF NOT EXISTS home_content (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
        headline TEXT NOT NULL,
        subtext TEXT NOT NULL,
        hero_image TEXT,
        cta_primary VARCHAR(255) NOT NULL,
        cta_secondary VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('  ✅ home_content table created')
    
    // About content table
    await sql`
      CREATE TABLE IF NOT EXISTS about_content (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
        badge VARCHAR(255) NOT NULL,
        headline TEXT NOT NULL,
        subtext TEXT NOT NULL,
        mission_title VARCHAR(255) NOT NULL,
        mission_paragraph_1 TEXT NOT NULL,
        mission_paragraph_2 TEXT NOT NULL,
        hero_image TEXT,
        mission_image TEXT,
        values_title VARCHAR(255) NOT NULL,
        values_subtext TEXT NOT NULL,
        cta_title VARCHAR(255) NOT NULL,
        cta_text TEXT NOT NULL,
        values JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('  ✅ about_content table created')
    
    // Contact content table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_content (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
        headline TEXT NOT NULL,
        subtext TEXT NOT NULL,
        form_title VARCHAR(255) NOT NULL,
        contact_info JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('  ✅ contact_content table created')
    
    // FAQs table
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('  ✅ faqs table created')
    
    // Create indexes
    console.log('\n📊 Creating indexes...\n')
    
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating)`
    console.log('  ✅ idx_testimonials_rating created')
    
    await sql`CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category)`
    console.log('  ✅ idx_faqs_category created')
    
    await sql`CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug)`
    console.log('  ✅ idx_services_slug created')
    
    console.log('\n✅ Database schema initialized successfully!')
    console.log('\n🎉 Your Neon database is ready to use!')
    console.log('\n💡 Next steps:')
    console.log('  1. Run "npm run migrate" to copy your JSON data to the database')
    console.log('  2. Or start using the admin panel - new data will go to Neon DB')
    
  } catch (error: any) {
    console.error('\n❌ Database initialization error:', error.message)
    if (error.message?.includes('already exists')) {
      console.log('\n💡 Some tables already exist - that\'s okay!')
      console.log('   The database is already initialized.')
    } else {
      console.error('\n💡 Tip: Make sure your DATABASE_URL is correct and you have permission to create tables.')
      process.exit(1)
    }
  }
}

// Run initialization
initDatabase()
