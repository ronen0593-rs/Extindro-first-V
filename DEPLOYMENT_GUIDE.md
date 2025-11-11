# Vercel Deployment Guide (Web Interface)

## Quick Reference: Environment Variables

Copy these exact values into Vercel's web interface:

| Variable Name | Value to Copy |
|--------------|---------------|
| `VITE_SUPABASE_URL` | `https://jotqimkdgrorpnrzsdjz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdHFpbWtkZ3JvcnBucnpzZGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTcyNzAsImV4cCI6MjA3ODAzMzI3MH0.iDdZuqK5vRLggcmi9DfBiWXIthPVfaoeusFMb7X5cr4` |

## Step-by-Step Deployment via Vercel Web Dashboard

### Step 1: Access Vercel Dashboard

1. Go to **https://vercel.com**
2. Sign in with your GitHub, GitLab, or Bitbucket account
3. Click **"Add New..."** button (top right)
4. Select **"Project"**

### Step 2: Import Your Repository

1. You'll see **"Import Git Repository"** screen
2. If this is your first time:
   - Click **"Install Vercel"** on your Git provider (GitHub/GitLab/Bitbucket)
   - Grant Vercel access to your repositories
3. Find and select your project repository from the list
4. Click **"Import"**

### Step 3: Configure Project Settings

Vercel will show the **"Configure Project"** screen. Here's what to set:

#### Framework Preset
- **Should auto-detect as**: `Vite`
- If not, select **"Vite"** from dropdown

#### Root Directory
- **Leave as**: `.` (root directory)
- Do NOT change this

#### Build and Output Settings
These should be auto-filled, but verify:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables (CRITICAL)

Before clicking Deploy, you MUST add environment variables:

1. Scroll down to **"Environment Variables"** section
2. Click to expand it
3. Add **First Variable**:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://jotqimkdgrorpnrzsdjz.supabase.co`
   - **Environment**: Check ALL boxes (Production, Preview, Development)
   - Click **"Add"**

4. Add **Second Variable**:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdHFpbWtkZ3JvcnBucnpzZGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTcyNzAsImV4cCI6MjA3ODAzMzI3MH0.iDdZuqK5vRLggcmi9DfBiWXIthPVfaoeusFMb7X5cr4`
   - **Environment**: Check ALL boxes (Production, Preview, Development)
   - Click **"Add"**

### Step 5: Deploy

1. Click the blue **"Deploy"** button at the bottom
2. Vercel will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy to their CDN
3. Wait 1-3 minutes for the build to complete
4. You'll see a success screen with your live URL

### Step 6: Verify Deployment

1. Click **"Visit"** to open your deployed site
2. Test these features:
   - Website loads and displays correctly
   - Navigation works
   - Mobile menu functions
   - Forms can be submitted
   - Check browser console for any errors (F12 > Console)

## After First Deployment

### Automatic Deployments

Every time you push changes to your repository's main branch, Vercel will automatically:
- Detect the changes
- Build your project
- Deploy the update
- No manual action needed

### Managing Environment Variables Later

If you need to add or change environment variables:

1. Go to your Vercel dashboard
2. Select your project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Add/Edit variables
6. After saving, click **"Redeploy"** on any previous deployment to apply changes

## Verifying Deployment

After deployment, test these features:

1. ✅ Website loads correctly
2. ✅ All navigation links work
3. ✅ Mobile menu functions properly
4. ✅ Forms submit successfully (check Supabase for data)
5. ✅ Image uploads work (if applicable)
6. ✅ No console errors in browser DevTools

## Troubleshooting

### Build Fails

- Check the Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables Not Working

- Ensure variable names have the `VITE_` prefix
- Redeploy after adding/changing environment variables
- Clear browser cache and hard refresh

### 404 Errors on Page Refresh

- This shouldn't happen with `vercel.json` configured
- If it does, verify the `rewrites` section in `vercel.json`

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is active and accessible
- Review browser console for specific error messages

## Alternative: Netlify Deployment

If you prefer Netlify, the project includes `netlify.toml` with the same configuration:

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** > **Import an existing project**
3. Connect your Git repository
4. Add the same environment variables in **Site settings** > **Environment variables**
5. Deploy

## Security Notes

- ✅ The Supabase Anon Key is safe to expose publicly (it's designed for client-side use)
- ✅ Never commit the `.env` file to version control (it's already in `.gitignore`)
- ✅ Use Row Level Security (RLS) in Supabase to protect your database
- ✅ The Anon Key has limited permissions controlled by Supabase RLS policies

## Support

For issues specific to:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Vite**: [vitejs.dev](https://vitejs.dev)
