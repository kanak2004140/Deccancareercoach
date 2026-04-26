# 🚀 Quick Auto-Deployment Setup

Your application is **ready to auto-deploy**. Just follow these steps:

---

## **Part 1: Frontend (Vercel) - Easiest ⭐**

### 2-Minute Setup:

1. **Go to:** https://vercel.com/new
2. **Click:** "Import Git Repository"
3. **Paste:** `https://github.com/kanak2004140/Deccancareercoach`
4. **Select:** `frontend` as root directory
5. **Add Environment Variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-backend.railway.app/api` (we'll update this later)
6. **Click:** "Deploy" ✅

**Result:** Your frontend is live! You'll get a URL like `https://deccancareercoach.vercel.app`

- ✅ Auto-redeploys on every push to GitHub
- ✅ Free tier available
- ✅ No additional setup needed

---

## **Part 2: Backend (Railway) - With Auto-Deploy**

### 5-Minute Setup:

#### Step 1: Get Railway API Token

1. Go to: https://railway.app/account/tokens
2. Click "Create New Token"
3. Name it: `GITHUB_DEPLOY`
4. Copy the token (you'll only see it once!)

#### Step 2: Add Token to GitHub Secrets

1. Go to: https://github.com/kanak2004140/Deccancareercoach
2. Click: **Settings** → **Secrets and variables** → **Actions**
3. Click: **New repository secret**
4. Add these 2 secrets:

   **Secret 1:**
   - Name: `RAILWAY_API_TOKEN`
   - Value: (paste the token from Railway)
   
   **Secret 2:**
   - Name: `RAILWAY_PROJECT_ID`
   - Value: (see step 3 below to get this)

#### Step 3: Create Railway Project

1. Go to: https://railway.app
2. Click: **New Project** → **Deploy from GitHub repo**
3. Authorize & select: `kanak2004140/Deccancareercoach`
4. Create the project
5. Go to **Project Settings** → copy the **Project ID**
6. Paste it in GitHub secret `RAILWAY_PROJECT_ID`

#### Step 4: Configure Environment Variables (in Railway)

In your Railway dashboard:

```
PORT=8000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-frontend.vercel.app
```

#### Step 5: Deploy First Time

- Click "Deploy" in Railway dashboard
- Wait for the deployment to complete (2-3 minutes)
- Copy your Railway URL (e.g., `https://api-production.railway.app`)

---

## **Part 3: Connect Frontend to Backend**

Once you have your Railway URL:

1. Go to Vercel project dashboard
2. Click: **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_API_URL`:
   ```
   https://your-railway-url.railway.app/api
   ```
4. Click: **Save** (automatic redeploy happens)
5. Wait 2-3 minutes for redeployment

---

## ✅ After Setup - Auto-Deploy Works!

Now whenever you push to GitHub:

```
📤 git push origin main
    ↓
🔍 GitHub Actions triggers
    ↓
🚀 Auto-deploys to Railway (backend)
    ↓
✅ Your app updates automatically
```

**No manual deployment needed anymore!** 🎉

---

## 🔗 Your Live URLs

After setup:
- **Frontend:** `https://your-vercel-domain.vercel.app`
- **Backend API:** `https://your-railway-domain.railway.app/api`

---

## 🧪 Test the Deployment

After both are deployed:

```bash
# Test frontend loads
curl https://your-vercel-domain.vercel.app

# Test API works
curl https://your-railway-domain.railway.app/api/health
```

Should return:
```json
{ "status": "Server is running", "timestamp": "..." }
```

---

## ❓ Need Help?

- **Vercel Issues:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md#-troubleshooting)
- **Railway Issues:** Check Railway dashboard logs
- **Connection Issues:** Verify CORS_ORIGIN matches your Vercel domain exactly

---

## 💡 Pro Tips

- ✅ Vercel auto-redeploys on every GitHub push (no setup needed)
- ✅ Railway auto-deploys via GitHub Actions (we configured it)
- ✅ Both have free tiers - no credit card needed initially
- ✅ Monitor everything from their dashboards

---

**You're all set!** Start with Vercel (2 min), then Railway (5 min), and you're live! 🚀
