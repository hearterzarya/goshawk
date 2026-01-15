# Deploy to Vercel - Step by Step Guide

## Prerequisites
- Your code is already on GitHub at: `https://github.com/hearterzarya/goshawk`
- A Vercel account (free tier works perfectly)

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
   - `BLOB_READ_WRITE_TOKEN` = Get this from Vercel Dashboard → Settings → Blob Storage (auto-generated)
   - `NEXT_PUBLIC_BASE_URL` = your Vercel deployment URL (optional)

**Note**: The `BLOB_READ_WRITE_TOKEN` is automatically created when you enable Blob Storage in your Vercel project. Go to your project settings → Storage → Blob to enable it.

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://goshawk-xxxxx.vercel.app`

### Step 6: Custom Domain (Optional)
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

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No** (for first deployment)
- Project name? **goshawk** (or press Enter for default)
- Directory? **./** (press Enter)
- Override settings? **No** (press Enter)

### Step 4: Production Deploy
```bash
vercel --prod
```

## Important Configuration Notes

### Admin Panel Access
After deployment, access the admin panel at:
- `https://your-domain.vercel.app/admin/login`

Default credentials (if not changed):
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT**: Change these credentials in production!

### Environment Variables
If you need to set environment variables via CLI:
```bash
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
vercel env add BLOB_READ_WRITE_TOKEN
```

**Note**: For `BLOB_READ_WRITE_TOKEN`, you can find it in:
- Vercel Dashboard → Your Project → Settings → Storage → Blob
- Or it will be auto-generated when you enable Blob Storage

### File Uploads
- ✅ **Vercel Blob Storage is now integrated!**
- Images are automatically stored in Vercel Blob (no local file system needed)
- To enable Blob Storage:
  1. Go to your Vercel project dashboard
  2. Navigate to **Settings** → **Storage** → **Blob**
  3. Click **"Create Database"** (if not already created)
  4. The `BLOB_READ_WRITE_TOKEN` will be automatically added to your environment variables

### Build Settings
Your `next.config.js` is already configured for production builds.

## Post-Deployment Checklist

- [ ] Test the homepage loads correctly
- [ ] Test admin login works
- [ ] Test image uploads (if using file system, may need cloud storage)
- [ ] Test all forms (Quote, Contact, Carrier)
- [ ] Verify all pages are accessible
- [ ] Check mobile responsiveness
- [ ] Update admin credentials
- [ ] Set up custom domain (optional)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default)

### Images Not Loading
- Check image paths are correct
- Verify `BLOB_READ_WRITE_TOKEN` environment variable is set
- Ensure Blob Storage is enabled in Vercel project settings
- Check that images are using full URLs from Vercel Blob (not local paths)

### Admin Panel Not Working
- Verify environment variables are set
- Check API routes are accessible
- Review Vercel function logs

## Vercel Features You Get

✅ **Automatic HTTPS** - SSL certificates included  
✅ **Global CDN** - Fast loading worldwide  
✅ **Automatic Deployments** - Deploys on every git push  
✅ **Preview Deployments** - Test PRs before merging  
✅ **Analytics** - Built-in performance monitoring  
✅ **Edge Functions** - Fast API routes  

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support

---

**Your Repository**: https://github.com/hearterzarya/goshawk  
**Deploy Now**: https://vercel.com/new
