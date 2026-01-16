# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Admin Panel Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Neon Database (REQUIRED)
# Get this from: https://console.neon.tech/ → Your Project → Connection String
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Base URL (Optional - for local development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## How to Get DATABASE_URL

### Step 1: Create Neon Database
1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up or log in
3. Create a new project
4. Copy your connection string

### Step 2: Initialize Database
1. Add `DATABASE_URL` to your `.env.local` file
2. Run the initialization script:
   ```bash
   npm run db:init
   ```
3. This will create all necessary tables

### Step 3: Migrate Existing Data (Optional)
If you have existing JSON data:
```bash
npm run migrate
```

## Quick Setup Steps

1. **Create `.env.local` file** in the project root:
   ```bash
   cp env.template .env.local
   ```

2. **Add your Neon database connection string**:
   - Get it from [Neon Console](https://console.neon.tech/)
   - Add it to `.env.local` as `DATABASE_URL`

3. **Initialize the database**:
   ```bash
   npm run db:init
   ```

4. **Start your dev server**:
   ```bash
   npm run dev
   ```

## Troubleshooting

### Database Connection Issues

1. **Check if DATABASE_URL is set**:
   - Make sure `.env.local` exists
   - Verify the connection string is correct
   - Restart the dev server after adding variables

2. **Check connection string format**:
   - Should start with `postgresql://`
   - Should include `?sslmode=require`
   - Example: `postgresql://user:password@host/database?sslmode=require`

3. **Verify database is initialized**:
   - Run `npm run db:init` to create tables
   - Check Neon Console to see if tables exist

### Images Not Working

1. **Check database connection**:
   - Make sure `DATABASE_URL` is set correctly
   - Verify database is initialized (run `npm run db:init`)

2. **Check browser console** for errors:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see if image requests are failing

3. **Verify images table exists**:
   - Run `npm run db:init` if you haven't already
   - Check Neon Console SQL editor to verify `images` table exists

## Security Notes

⚠️ **Never commit `.env.local` to Git!** It's already in `.gitignore`

- Keep your `ADMIN_PASSWORD` secure
- Don't share your `DATABASE_URL` publicly
- Use different credentials for production
- The database connection string contains sensitive credentials