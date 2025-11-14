# SnapXtract Deployment Guide

## Prerequisites
- Supabase account (supabase.com)
- Vercel account (vercel.com)
- Node.js 18+ installed

## Part 1: Supabase Setup

### 1. Create Supabase Project
1. Go to supabase.com and create new project
2. Note your project URL and anon key

### 2. Run Database Migrations
```sql
-- Copy and paste the entire contents of:
-- supabase/migrations/20240101000000_complete_schema.sql
-- into Supabase SQL Editor and run
```

### 3. Set Up Storage
1. Go to Storage in Supabase dashboard
2. Create bucket named `screenshots`
3. Set bucket to public or add RLS policies

### 4. Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Deploy all functions
supabase functions deploy extract-screenshot
supabase functions deploy detect-screenshot
supabase functions deploy bulk-import
supabase functions deploy tag-management
supabase functions deploy generate-api-key
supabase functions deploy api-upload
supabase functions deploy webhook-notify
supabase functions deploy search-screenshots
```

### 5. Set Environment Variables in Supabase
Go to Project Settings > Edge Functions > Add secrets:
- `OPENAI_API_KEY` - Your OpenAI API key for GPT-4o

## Part 2: Vercel Deployment (Web App)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Add Environment Variables in Vercel
Project Settings > Environment Variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Deploy
Click "Deploy" - Vercel will build and deploy automatically

## Part 3: Mobile App (iOS/iPadOS)

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Configure Mobile App
```bash
cd mobile
eas build:configure
```

### 3. Create .env file
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Build for iOS
```bash
eas build --platform ios
```

### 5. Submit to App Store
```bash
eas submit --platform ios
```

## Verification Checklist

✅ Database tables created (18 tables)
✅ RLS policies enabled
✅ Storage bucket configured
✅ Edge functions deployed (12 functions)
✅ Web app deployed on Vercel
✅ Mobile app built for iOS
✅ Environment variables set

## Post-Deployment

1. Test web app at your-app.vercel.app
2. Create test user account
3. Upload test screenshot
4. Verify AI extraction works
5. Test mobile app with TestFlight
6. Configure custom domain (optional)

## Support

Issues? Check:
- Supabase logs: Dashboard > Logs
- Vercel logs: Deployment > Functions
- Edge function logs: Supabase > Edge Functions > Logs
