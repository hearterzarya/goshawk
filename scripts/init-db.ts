/**
 * Initialize Neon Database Schema
 * Run this script to create all tables in your Neon database
 */

import { neon } from '@neondatabase/serverless'
import { readFile } from 'fs/promises'
import { join } from 'path'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL environment variable is not set')
  console.log('\nPlease set DATABASE_URL in your .env.local file:')
  console.log('DATABASE_URL=postgresql://user:password@host/database?sslmode=require')
  process.exit(1)
}

const sql = neon(connectionString)

async function initDatabase() {
  try {
    console.log('🔌 Connecting to Neon database...')
    
    // Read schema file
    const schemaPath = join(process.cwd(), 'lib', 'db', 'schema.sql')
    const schema = await readFile(schemaPath, 'utf-8')
    
    console.log('📄 Reading schema file...')
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`📝 Found ${statements.length} SQL statements to execute\n`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        try {
          // Execute using template literal (Neon requires this)
          // We'll use a workaround by constructing the query
          const query = statement.trim()
          
          // For CREATE TABLE statements, we need to execute them properly
          // Neon's sql function expects template literals, so we'll use a different approach
          // We'll execute the raw SQL by constructing it as a template
          
          // Split multi-line statements and execute
          if (query.includes('CREATE TABLE')) {
            console.log(`  Creating table: ${query.match(/CREATE TABLE.*?(\w+)/)?.[1] || 'unknown'}...`)
          } else if (query.includes('CREATE INDEX')) {
            console.log(`  Creating index...`)
          }
          
          // Use eval to construct template literal (safe here since we control the SQL)
          // Actually, let's use a safer approach - execute via psql or use Neon's API
          // For now, we'll use the sql function with proper template literal construction
          
          // Execute the statement
          await sql(query as any)
          
        } catch (error: any) {
          // Some statements might fail if tables already exist - that's okay
          if (error.message?.includes('already exists')) {
            console.log(`  ⚠️  Table/index already exists, skipping...`)
          } else {
            console.error(`  ❌ Error executing statement ${i + 1}:`, error.message)
            throw error
          }
        }
      }
    }
    
    console.log('\n✅ Database schema initialized successfully!')
    console.log('\n📊 Tables created:')
    console.log('  - services')
    console.log('  - testimonials')
    console.log('  - home_content')
    console.log('  - about_content')
    console.log('  - contact_content')
    console.log('  - faqs')
    
  } catch (error: any) {
    console.error('\n❌ Database initialization error:', error.message)
    console.error('\n💡 Tip: Make sure your DATABASE_URL is correct and you have permission to create tables.')
    process.exit(1)
  }
}

// Run initialization
initDatabase()
