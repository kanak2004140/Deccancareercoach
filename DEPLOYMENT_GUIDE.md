# 🚀 Deployment Guide - Deccan AI Career Coach

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

**Step 1: Deploy Frontend**
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. In frontend directory
cd frontend
vercel

# 3. Follow prompts:
#    - Set project name: deccan-career-coach
#    - Set root directory: frontend
#    - Build command: npm run build
#    - Output directory: .next

# 4. Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

---

### Option 2: Railway (Recommended for Backend)

**Step 1: Deploy Backend**
```bash
# 1. Create account at railway.app
# 2. Connect GitHub repository
# 3. Create new service
# 4. Select Node.js
# 5. Point to backend directory

# Environment Variables:
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

**Step 2: Deploy Frontend**
```bash
# Point to frontend directory
# Set environment variables
NEXT_PUBLIC_API_URL=https://your-api-railway.app/api
```

---

### Option 3: AWS (Enterprise)

**Backend - Elastic Beanstalk:**
```bash
# 1. Install EB CLI
pip install awsebcli

# 2. Initialize
cd backend
eb init

# 3. Create environment
eb create deccan-backend

# 4. Deploy
eb deploy

# 5. Set environment variables
eb setenv CORS_ORIGIN=https://your-frontend.com
```

**Frontend - CloudFront + S3:**
```bash
# 1. Build
cd frontend
npm run build

# 2. Upload to S3
aws s3 sync .next s3://your-bucket/

# 3. Create CloudFront distribution
# 4. Point domain to CloudFront
```

---

### Option 4: Docker (For any platform)

**Create Dockerfile (Backend):**
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
```

**Create Dockerfile (Frontend):**
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - CORS_ORIGIN=http://frontend:3000
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - backend
      - frontend
```

**Deploy:**
```bash
docker-compose up -d
```

---

### Option 5: Heroku

**Backend Deployment:**
```bash
# 1. Create Heroku account at heroku.com
# 2. Install Heroku CLI

# 3. Login
heroku login

# 4. Create app
heroku create deccan-coach-backend

# 5. Add Procfile to backend:
echo "web: node server.js" > backend/Procfile

# 6. Deploy
cd backend
git push heroku main

# 7. Set environment variables
heroku config:set CORS_ORIGIN=https://your-frontend.com
```

**Frontend Deployment:**
```bash
# Similar process, but use:
# Procfile: web: npm start (for Next.js)
```

---

## Pre-Deployment Checklist

### Backend
- [ ] Remove console.logs
- [ ] Set NODE_ENV=production
- [ ] Update .env with production values
- [ ] Add database connection string
- [ ] Enable HTTPS
- [ ] Set CORS_ORIGIN to frontend URL
- [ ] Add security headers
- [ ] Set rate limiting
- [ ] Test all API endpoints
- [ ] Check error handling

### Frontend
- [ ] Update API URLs to production
- [ ] Remove debug code
- [ ] Test all components
- [ ] Check responsive design
- [ ] Test on mobile browsers
- [ ] Optimize images
- [ ] Check animations performance
- [ ] Test error states
- [ ] Verify environment variables
- [ ] Build and test: `npm run build`

---

## Environment Variables (Production)

### Backend .env.production
```bash
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourapp.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
OPENAI_API_KEY=sk-prod-key
SESSION_TIMEOUT=3600000
RATE_LIMIT=100
```

### Frontend .env.production
```bash
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
NEXT_PUBLIC_ENVIRONMENT=production
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# 1. Install Certbot
sudo apt-get install certbot

# 2. Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# 3. Configure Nginx/Apache to use certificate
# 4. Auto-renewal:
sudo certbot renew --dry-run
```

### Update Node.js for HTTPS
```javascript
// server.js
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem')
};

https.createServer(options, app).listen(443);
```

---

## Database Migration (if using MongoDB)

```bash
# 1. Create MongoDB Atlas cluster at mongodb.com
# 2. Get connection string
# 3. Update MONGODB_URI in .env
# 4. Run migration script

node scripts/migrate.js

# 5. Verify data
```

---

## CI/CD Pipeline (GitHub Actions)

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          npm run build
          # Deploy to Railway/Heroku
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          # Deploy to Vercel
```

---

## Monitoring & Logging

### Backend Logging
```javascript
// Add logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
```

### Error Tracking
```bash
# Use Sentry for error tracking
npm install @sentry/node

# Configure in server.js
import * as Sentry from "@sentry/node";

Sentry.init({ 
  dsn: "https://your-sentry-dsn@sentry.io/project" 
});
```

---

## Performance Optimization

### Backend
```javascript
// Add caching
import redis from 'redis';
const redisClient = redis.createClient();

// Compression
import compression from 'compression';
app.use(compression());

// Rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### Frontend
```javascript
// Next.js optimization already included
// - Image optimization
// - Code splitting
// - CSS optimization
// - Dynamic imports

// Enable static generation
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600
  }
}
```

---

## Scaling Strategy

### Phase 1: Small Scale
- Single Node.js instance
- Single Next.js deployment
- SQLite/Local storage

### Phase 2: Medium Scale
- Load balancer (Nginx)
- Multiple Node.js instances
- MongoDB for database
- Redis for caching

### Phase 3: Large Scale
- Kubernetes clusters
- Microservices architecture
- Message queues (RabbitMQ)
- Advanced monitoring

---

## Backup Strategy

```bash
# Backup database
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/db"

# Backup uploads
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz uploads/

# Automated backups (cron)
0 2 * * * /path/to/backup-script.sh
```

---

## Post-Deployment

- [ ] Test all features
- [ ] Monitor logs
- [ ] Check performance metrics
- [ ] Verify backups
- [ ] Set up alerts
- [ ] Document deployment
- [ ] Create runbook
- [ ] Train team
- [ ] Plan rollback procedure

---

## Troubleshooting Deployment

### Backend won't start
```bash
# Check logs
heroku logs --tail
railway logs

# Verify environment variables
heroku config
```

### Frontend shows blank page
```bash
# Check browser console
# Check build output
npm run build

# Verify API URL
echo $NEXT_PUBLIC_API_URL
```

### CORS errors after deployment
```javascript
// Update CORS_ORIGIN in backend
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## Domain Configuration

```
1. Buy domain from Namecheap/GoDaddy
2. Point nameservers to hosting provider
3. Create DNS records:
   - A record: Points to backend IP
   - CNAME: www -> backend
   - TXT: Verification records
4. Set up SSL certificate
5. Test: https://yourdomain.com
```

---

## Success Criteria

✅ Application loads without errors
✅ All API endpoints working
✅ Database connected
✅ Files upload working
✅ Assessment completes end-to-end
✅ Results display correctly
✅ Performance metrics acceptable
✅ No console errors
✅ SSL certificate valid
✅ Monitoring active

---

Happy Deploying! 🚀

For questions: Support team or documentation
