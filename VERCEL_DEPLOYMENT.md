# 🚀 Deccan AI Career Coach - Production Deployment Guide

## 📋 Deployment Architecture

```
├── Frontend (Next.js 14) → Vercel
├── Backend (Node.js Express) → Railway OR Render
└── Environment Variables → Configured in each platform
```

---

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Frontend to Vercel

#### Requirements:
- Vercel account (free at https://vercel.com)
- GitHub repository (already pushed)

#### Instructions:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `kanak2004140/Deccancareercoach`

3. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Set Environment Variables**
   - Add: `NEXT_PUBLIC_API_URL`
   - Value: Leave blank for now (update after backend deployment)
   - Click "Deploy"

5. **Copy Your Vercel URL**
   - After deployment completes, copy your frontend URL
   - Example: `https://deccancareercoach.vercel.app`

---

### Step 2: Deploy Backend to Railway

#### Requirements:
- Railway account (free at https://railway.app)
- GitHub access

#### Instructions:

1. **Create New Project on Railway**
   - Visit https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Select Repository**
   - Authorize GitHub
   - Search and select: `kanak2004140/Deccancareercoach`
   - Wait for Railway to load repository

3. **Configure Build**
   - Select "Node.js" environment if prompted
   - Build Command: Leave default or use `npm install`
   - Start Command: `node backend/server.js`

4. **Set Environment Variables**
   ```
   PORT=8000
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-url.vercel.app
   OPENAI_API_KEY=sk-xxxxx (optional, for future integration)
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (takes 2-5 minutes)

6. **Copy Railway Backend URL**
   - Go to "Deployments" section
   - Copy the Public URL (e.g., `https://api-production.railway.app`)
   - Your API endpoint: `https://api-production.railway.app/api`

---

### Step 3: Connect Frontend to Backend

#### Update Vercel Environment Variable

1. **Go to Vercel Project Settings**
   - Visit https://vercel.com/dashboard
   - Select your project

2. **Update Environment Variables**
   - Go to Settings → Environment Variables
   - Find `NEXT_PUBLIC_API_URL`
   - Update value to: `https://your-railway-url.railway.app/api`

3. **Redeploy**
   - Go to Deployments
   - Click "Redeploy" on latest deployment
   - Wait for rebuild (2-3 minutes)

---

## ✅ Verification Checklist

After deployment, verify everything works:

- [ ] Frontend loads at https://your-domain.vercel.app
- [ ] Backend API responds: `curl https://your-api/api/health`
- [ ] CORS headers present in API responses
- [ ] Can upload resume file
- [ ] Can enter job description
- [ ] Assessment flow completes
- [ ] Results display correctly

---

## 🧪 Testing the Deployment

### 1. Test Frontend
```bash
curl https://your-vercel-url.vercel.app
```

### 2. Test Backend Health Check
```bash
curl https://your-railway-url/api/health
```

### 3. Test API Connection
Use browser console to check if API calls work:
```javascript
fetch('https://your-railway-url/api/health')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e));
```

---

## 🆘 Troubleshooting

### CORS Errors
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Update `CORS_ORIGIN` in Railway environment variables
- Make sure it matches exactly your Vercel domain
- Redeploy backend after updating

### API 404 Errors
**Error:** `Cannot POST /api/assessment/initialize`

**Solution:**
- Verify `NEXT_PUBLIC_API_URL` ends with `/api`
- Check Railway backend is running
- Check backend logs in Railway dashboard

### Build Failures on Vercel
**Error:** `Build failed during framework detection`

**Solution:**
- Check Node version (18+ required)
- Verify all dependencies in package.json
- Check build logs for specific errors
- Try clearing cache and redeploying

### Backend Won't Start
**Error:** `Error: Cannot find module 'express'`

**Solution:**
- Make sure `npm install` runs before start
- Check package.json has all dependencies
- Verify railway.json configuration
- Check Railway build logs

---

## 📊 Environment Variables Summary

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://api-production.railway.app/api
```

### Backend (.env.production)
```
PORT=8000
NODE_ENV=production
CORS_ORIGIN=https://deccancareercoach.vercel.app
OPENAI_API_KEY=sk-your-key (optional)
```

---

## 🔗 Live Links After Deployment

**Frontend:** https://your-vercel-url.vercel.app
**Backend API:** https://your-railway-url/api
**GitHub:** https://github.com/kanak2004140/Deccancareercoach

---

## 💡 Next Steps

1. **Custom Domain (Optional)**
   - Vercel: Settings → Domains
   - Add custom domain
   - Update CORS_ORIGIN in Railway if changed

2. **Database Setup (Future)**
   - Create MongoDB Atlas cluster
   - Add MONGODB_URI to backend .env
   - Migrate from in-memory to persistent storage

3. **Monitoring**
   - Set up error tracking with Sentry
   - Monitor logs in Railway dashboard
   - Track performance metrics

4. **CI/CD Enhancements**
   - Auto-deploy on GitHub push
   - Run tests before deployment
   - Setup staging environment

---

## 📚 Useful Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-deployment.html)

---

**Your application is ready for production!** 🎉

For questions or issues, check the main README.md or DEPLOYMENT_GUIDE.md

