# Deploy to Vercel - Step by Step Guide

## Prerequisites
- Your code is already on GitHub at: `https://github.com/hearterzarya/goshawk`
- A Vercel account (free tier works perfectly)
- A Neon database (free tier available at [console.neon.tech](https://console.neon.tech/))

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Sign Up / Sign In to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign up with your GitHub account (recommended) for seamless integration

### Step 2: Import Your Project
1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find and select **"goshawk"** repository
4. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect Next.js settings, but verify:

- **Framework Preset**: Next.js (should be auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Step 4: Environment Variables
Add required environment variables:
1. Click **"Environment Variables"**
2. Add variables:
   - `ADMIN_USERNAME` = your admin username
   - `ADMIN_PASSWORD` = your admin password
   - `DATABASE_URL` = Your Neon database connection string (required)
   - `NEXT_PUBLIC_BASE_URL` = your Vercel deployment URL (optional)

**Note**: Get `DATABASE_URL` from [Neon Console](https://console.neon.tech/) → Your Project → Connection String

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://goshawk-xxxxx.vercel.app`

### Step 6: Initialize Database
After first deployment:
1. The database tables will be created automatically on first use
2. Or run `npm run db:init` locally and push the changes
3. Migrate existing data with `npm run migrate` if needed

### Step 7: Custom Domain (Optional)
1. Go to your project settings
2. Click **"Domains"**
3. Add your custom domain (e.g., `goshawklogistics.com`)
4. Follow DNS configuration instructions

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts to:
- Link to existing project or create new
- Set up environment variables
- Deploy

### Environment Variables
If you need to set environment variables via CLI:
```bash
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add DATABASE_URL
```

**Note**: For `DATABASE_URL`, get it from:
- [Neon Console](https://console.neon.tech/) → Your Project → Connection String
- Format: `postgresql://user:password@host/database?sslmode=require`

### Database Setup
- ✅ **Neon Database is integrated!**
- All data (including images) is stored in Neon PostgreSQL database
- To set up:
  1. Create a Neon database at [console.neon.tech](https://console.neon.tech/)
  2. Copy your connection string
  3. Add it as `DATABASE_URL` in Vercel environment variables
  4. The database will be automatically initialized on first use

### Build Settings
Your `next.config.js` is already configured for production builds.

## Post-Deployment Checklist

- [ ] Test the homepage loads correctly
- [ ] Test admin login works
- [ ] Test image uploads (images stored in database)
- [ ] Test all forms (Quote, Contact, Carrier)
- [ ] Verify all pages are accessible
- [ ] Check mobile responsiveness
- [ ] Update admin credentials
- [ ] Set up custom domain (optional)
- [ ] Verify database is initialized

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default)

### Images Not Loading
- Check database connection (`DATABASE_URL` is set correctly)
- Verify database is initialized (tables exist)
- Check that images are using database URLs (format: `/api/images/filename`)
- Check browser console for errors

### Admin Panel Not Working
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Check that you're using the correct credentials
- Clear browser cookies and try again

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Vercel
- Check Neon Console to ensure database is active
- Ensure connection string includes `?sslmode=require`
- Check Vercel function logs for database errors

## Production Tips

1. **Use Strong Passwords**: Change default admin credentials
2. **Monitor Database**: Check Neon Console for usage and performance
3. **Backup Data**: Neon provides automatic backups, but consider additional backups
4. **Environment Variables**: Never commit sensitive data to Git
5. **Custom Domain**: Set up a custom domain for professional appearance

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Next.js Documentation](https://nextjs.org/docs)
