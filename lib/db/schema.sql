-- Goshawk Logistics Database Schema for Neon DB

-- Services table
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
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Home content table (single row)
CREATE TABLE IF NOT EXISTS home_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  headline TEXT NOT NULL,
  subtext TEXT NOT NULL,
  hero_image TEXT,
  cta_primary VARCHAR(255) NOT NULL,
  cta_secondary VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- About content table (single row)
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
);

-- Contact content table (single row)
CREATE TABLE IF NOT EXISTS contact_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  headline TEXT NOT NULL,
  subtext TEXT NOT NULL,
  form_title VARCHAR(255) NOT NULL,
  contact_info JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Images table - stores all uploaded images
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  data BYTEA NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_images_filename ON images(filename);
CREATE INDEX IF NOT EXISTS idx_images_url ON images(url);