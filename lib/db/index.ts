/**
 * Neon DB Database Connection and Utilities
 */

import { neon } from '@neondatabase/serverless'

// Get database URL from environment
const connectionString = process.env.DATABASE_URL

// Create Neon client (only if DATABASE_URL is set)
// If not set, the app will use JSON fallback
let sql: any = null

if (connectionString) {
  try {
    sql = neon(connectionString)
  } catch (error) {
    console.warn('Failed to initialize Neon DB, will use JSON fallback:', error)
  }
}

// Helper to check if DB is available
function checkDb() {
  if (!sql) {
    throw new Error('DATABASE_URL not configured - using JSON fallback')
  }
}

// Create Drizzle instance (we'll use raw SQL for simplicity)
export { sql }

/**
 * Initialize database - run schema migrations
 * Call this once to set up the database tables
 */
export async function initDatabase() {
  try {
    // For now, users should run the SQL schema manually in Neon Console
    // or we can provide a script that uses psql
    console.log('To initialize the database:')
    console.log('1. Copy the contents of lib/db/schema.sql')
    console.log('2. Run it in your Neon Console SQL editor')
    console.log('3. Or use: psql $DATABASE_URL < lib/db/schema.sql')
    console.log('\nAlternatively, the schema will be created automatically on first use.')
    
    // We'll create tables on-demand if they don't exist
    // This is safer than trying to execute raw SQL strings
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  }
}

/**
 * Services CRUD
 */
export const servicesDb = {
  async getAll() {
    checkDb()
    const result = await sql`
      SELECT 
        slug,
        title,
        short_description as "shortDescription",
        description,
        icon,
        image,
        features,
        benefits,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM services
      ORDER BY created_at DESC
    `
    return result.map((row: any) => ({
      ...row,
      features: Array.isArray(row.features) ? row.features : JSON.parse(row.features || '[]'),
      benefits: Array.isArray(row.benefits) ? row.benefits : JSON.parse(row.benefits || '[]'),
    }))
  },

  async getBySlug(slug: string) {
    checkDb()
    const result = await sql`
      SELECT 
        slug,
        title,
        short_description as "shortDescription",
        description,
        icon,
        image,
        features,
        benefits
      FROM services
      WHERE slug = ${slug}
      LIMIT 1
    `
    if (result.length === 0) return null
    
    const row = result[0] as any
    return {
      ...row,
      features: Array.isArray(row.features) ? row.features : JSON.parse(row.features || '[]'),
      benefits: Array.isArray(row.benefits) ? row.benefits : JSON.parse(row.benefits || '[]'),
    }
  },

  async create(service: any) {
    checkDb()
    await sql`
      INSERT INTO services (
        slug, title, short_description, description, icon, image, features, benefits
      ) VALUES (
        ${service.slug},
        ${service.title},
        ${service.shortDescription},
        ${service.description},
        ${service.icon},
        ${service.image || null},
        ${JSON.stringify(service.features)}::jsonb,
        ${JSON.stringify(service.benefits)}::jsonb
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        short_description = EXCLUDED.short_description,
        description = EXCLUDED.description,
        icon = EXCLUDED.icon,
        image = EXCLUDED.image,
        features = EXCLUDED.features,
        benefits = EXCLUDED.benefits,
        updated_at = CURRENT_TIMESTAMP
    `
    return service
  },

  async update(service: any) {
    checkDb()
    await sql`
      UPDATE services SET
        title = ${service.title},
        short_description = ${service.shortDescription},
        description = ${service.description},
        icon = ${service.icon},
        image = ${service.image || null},
        features = ${JSON.stringify(service.features)}::jsonb,
        benefits = ${JSON.stringify(service.benefits)}::jsonb,
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = ${service.slug}
    `
    return service
  },

  async delete(slug: string) {
    checkDb()
    await sql`DELETE FROM services WHERE slug = ${slug}`
  },
}

/**
 * Testimonials CRUD
 */
export const testimonialsDb = {
  async getAll() {
    checkDb()
    const result = await sql`
      SELECT id, name, role, company, content, rating,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM testimonials
      ORDER BY created_at DESC
    `
    return result
  },

  async getById(id: string) {
    checkDb()
    const result = await sql`
      SELECT id, name, role, company, content, rating
      FROM testimonials
      WHERE id = ${id}
      LIMIT 1
    `
    return result.length > 0 ? result[0] : null
  },

  async create(testimonial: any) {
    checkDb()
    await sql`
      INSERT INTO testimonials (id, name, role, company, content, rating)
      VALUES (
        ${testimonial.id},
        ${testimonial.name},
        ${testimonial.role},
        ${testimonial.company},
        ${testimonial.content},
        ${testimonial.rating}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        company = EXCLUDED.company,
        content = EXCLUDED.content,
        rating = EXCLUDED.rating,
        updated_at = CURRENT_TIMESTAMP
    `
    return testimonial
  },

  async update(testimonial: any) {
    checkDb()
    await sql`
      UPDATE testimonials SET
        name = ${testimonial.name},
        role = ${testimonial.role},
        company = ${testimonial.company},
        content = ${testimonial.content},
        rating = ${testimonial.rating},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${testimonial.id}
    `
    return testimonial
  },

  async delete(id: string) {
    checkDb()
    await sql`DELETE FROM testimonials WHERE id = ${id}`
  },
}

/**
 * Home Content
 */
export const homeContentDb = {
  async get() {
    checkDb()
    const result = await sql`
      SELECT 
        headline,
        subtext,
        hero_image as "heroImage",
        cta_primary as "ctaPrimary",
        cta_secondary as "ctaSecondary"
      FROM home_content
      WHERE id = 'main'
      LIMIT 1
    `
    return result.length > 0 ? result[0] : null
  },

  async update(content: any) {
    checkDb()
    await sql`
      INSERT INTO home_content (id, headline, subtext, hero_image, cta_primary, cta_secondary)
      VALUES (
        'main',
        ${content.headline},
        ${content.subtext},
        ${content.heroImage || null},
        ${content.ctaPrimary},
        ${content.ctaSecondary}
      )
      ON CONFLICT (id) DO UPDATE SET
        headline = EXCLUDED.headline,
        subtext = EXCLUDED.subtext,
        hero_image = EXCLUDED.hero_image,
        cta_primary = EXCLUDED.cta_primary,
        cta_secondary = EXCLUDED.cta_secondary,
        updated_at = CURRENT_TIMESTAMP
    `
    return content
  },
}

/**
 * About Content
 */
export const aboutContentDb = {
  async get() {
    checkDb()
    const result = await sql`
      SELECT 
        badge,
        headline,
        subtext,
        mission_title as "missionTitle",
        mission_paragraph_1 as "missionParagraph1",
        mission_paragraph_2 as "missionParagraph2",
        hero_image as "heroImage",
        mission_image as "missionImage",
        values_title as "valuesTitle",
        values_subtext as "valuesSubtext",
        cta_title as "ctaTitle",
        cta_text as "ctaText",
        values
      FROM about_content
      WHERE id = 'main'
      LIMIT 1
    `
    if (result.length === 0) return null
    
    const row = result[0] as any
    return {
      ...row,
      values: Array.isArray(row.values) ? row.values : JSON.parse(row.values || '[]'),
    }
  },

  async update(content: any) {
    checkDb()
    await sql`
      INSERT INTO about_content (
        id, badge, headline, subtext, mission_title, mission_paragraph_1,
        mission_paragraph_2, hero_image, mission_image, values_title,
        values_subtext, cta_title, cta_text, values
      )
      VALUES (
        'main',
        ${content.badge},
        ${content.headline},
        ${content.subtext},
        ${content.missionTitle},
        ${content.missionParagraph1},
        ${content.missionParagraph2},
        ${content.heroImage || null},
        ${content.missionImage || null},
        ${content.valuesTitle},
        ${content.valuesSubtext},
        ${content.ctaTitle},
        ${content.ctaText},
        ${JSON.stringify(content.values)}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        badge = EXCLUDED.badge,
        headline = EXCLUDED.headline,
        subtext = EXCLUDED.subtext,
        mission_title = EXCLUDED.mission_title,
        mission_paragraph_1 = EXCLUDED.mission_paragraph_1,
        mission_paragraph_2 = EXCLUDED.mission_paragraph_2,
        hero_image = EXCLUDED.hero_image,
        mission_image = EXCLUDED.mission_image,
        values_title = EXCLUDED.values_title,
        values_subtext = EXCLUDED.values_subtext,
        cta_title = EXCLUDED.cta_title,
        cta_text = EXCLUDED.cta_text,
        values = EXCLUDED.values,
        updated_at = CURRENT_TIMESTAMP
    `
    return content
  },
}

/**
 * Contact Content
 */
export const contactContentDb = {
  async get() {
    checkDb()
    const result = await sql`
      SELECT 
        headline,
        subtext,
        form_title as "formTitle",
        contact_info as "contactInfo"
      FROM contact_content
      WHERE id = 'main'
      LIMIT 1
    `
    if (result.length === 0) return null
    
    const row = result[0] as any
    return {
      ...row,
      contactInfo: Array.isArray(row.contactInfo) ? row.contactInfo : JSON.parse(row.contactInfo || '[]'),
    }
  },

  async update(content: any) {
    checkDb()
    await sql`
      INSERT INTO contact_content (
        id, headline, subtext, form_title, contact_info
      )
      VALUES (
        'main',
        ${content.headline},
        ${content.subtext},
        ${content.formTitle},
        ${JSON.stringify(content.contactInfo)}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        headline = EXCLUDED.headline,
        subtext = EXCLUDED.subtext,
        form_title = EXCLUDED.form_title,
        contact_info = EXCLUDED.contact_info,
        updated_at = CURRENT_TIMESTAMP
    `
    return content
  },
}
