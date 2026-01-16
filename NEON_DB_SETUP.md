# Neon DB Setup Guide

This project now uses **Neon DB** (serverless Postgres) for data storage instead of JSON files. This provides better scalability, reliability, and performance.

## 🚀 Quick Setup

### 1. Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up or log in
3. Create a new project
4. Copy your connection string (it looks like: `postgresql://user:password@host/database`)

### 2. Set Environment Variable

Add your Neon connection string to your `.env.local` file:

```bash
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

**For Vercel Deployment:**
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `DATABASE_URL` with your Neon connection string
4. Redeploy your application

### 3. Initialize Database Schema

Run the migration script to create all tables:

```bash
npm run db:init
```

Or manually run the SQL schema:

```bash
# Copy the contents of lib/db/schema.sql
# Run it in your Neon SQL editor
```

### 4. Migrate Existing Data (Optional)

If you have existing JSON data, migrate it to Neon DB:

```bash
npm run migrate
```

This will:
- Initialize the database schema
- Copy all data from JSON files to Neon DB
- Keep your JSON files as backup

## 📊 Database Schema

The database includes the following tables:

- **services** - Service listings (slug, title, description, features, benefits)
- **testimonials** - Customer testimonials (name, role, company, content, rating)
- **home_content** - Homepage content (headline, subtext, hero image, CTAs)
- **about_content** - About page content (mission, values, images)
- **contact_content** - Contact page content (headline, form, contact info)
- **faqs** - Frequently asked questions (question, answer, category)

## 🔄 How It Works

### Automatic Fallback

The API routes are designed with **automatic fallback**:
- **Primary**: Uses Neon DB if `DATABASE_URL` is set
- **Fallback**: Uses JSON files if DB is unavailable or not configured

This means:
- ✅ Works immediately with JSON files (no breaking changes)
- ✅ Automatically uses Neon DB when configured
- ✅ Graceful degradation if DB connection fails

### API Routes Updated

All these routes now use Neon DB:
- `/api/admin/services` - Services CRUD
- `/api/admin/testimonials` - Testimonials CRUD
- `/api/admin/content/home` - Home content
- `/api/admin/content/about` - About content
- `/api/admin/content/contact` - Contact content

## 🛠️ Development

### Local Development

1. **With Neon DB** (Recommended):
   ```bash
   # Set DATABASE_URL in .env.local
   npm run dev
   ```

2. **Without Neon DB** (JSON fallback):
   ```bash
   # Don't set DATABASE_URL
   npm run dev
   # Will automatically use JSON files
   ```

### Testing Database Connection

You can test your connection by running:

```bash
npm run db:init
```

If successful, you'll see: `Database initialized successfully`

## 📝 Migration Notes

### Before Migration

- Your JSON files in `/data` are **not deleted**
- They remain as backup
- The app will use JSON files if DB is unavailable

### After Migration

- All new data goes to Neon DB
- JSON files are no longer updated automatically
- You can manually sync if needed

## 🔒 Security

- Never commit `DATABASE_URL` to Git
- Use environment variables for all database connections
- Neon DB uses SSL by default (secure connections)

## 🆘 Troubleshooting

### "DATABASE_URL environment variable is not set"

**Solution**: Add `DATABASE_URL` to your `.env.local` file or Vercel environment variables.

### "Connection refused" or "Connection timeout"

**Solutions**:
1. Check your Neon connection string is correct
2. Ensure your IP is allowed (Neon allows all by default)
3. Verify SSL mode: `?sslmode=require` at end of connection string

### "Table does not exist"

**Solution**: Run the schema initialization:
```bash
npm run db:init
```

### Data not showing after migration

**Solutions**:
1. Check if migration completed successfully
2. Verify data in Neon Console SQL editor
3. Check browser console for errors
4. Ensure `DATABASE_URL` is set correctly

## 📚 Resources

- [Neon Documentation](https://neon.tech/docs)
- [Neon Console](https://console.neon.tech/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 💡 Benefits of Neon DB

✅ **Serverless** - No database server management  
✅ **Scalable** - Automatically scales with your app  
✅ **Fast** - Low latency, global distribution  
✅ **Reliable** - Built-in backups and point-in-time recovery  
✅ **Free Tier** - Generous free tier for development  
✅ **Postgres** - Full PostgreSQL compatibility  

## 🔄 Switching Back to JSON

If you want to switch back to JSON files:

1. Remove or comment out `DATABASE_URL` from `.env.local`
2. Restart your dev server
3. The app will automatically use JSON files

No code changes needed!
