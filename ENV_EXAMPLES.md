# Environment Configuration Examples

## Backend (.env)

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# LLM API (Optional - for real OpenAI integration)
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.7

# File Upload
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_DIR=./uploads

# Session
SESSION_TIMEOUT=3600000  # 1 hour in milliseconds
```

## Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Environment
NEXT_PUBLIC_ENVIRONMENT=development

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_LOGGING=true

# UI Configuration
NEXT_PUBLIC_ANIMATIONS_ENABLED=true
NEXT_PUBLIC_THEME=dark
```

## Production Configuration

### Backend (.env.production)
```bash
PORT=5000
NODE_ENV=production

# Update this to your production frontend URL
CORS_ORIGIN=https://yourapp.com

# Production LLM API
OPENAI_API_KEY=sk-prod-api-key
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.5

# Security
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX_REQUESTS=100

# Database (if using MongoDB)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Frontend (.env.production.local)
```bash
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Development Tips

1. **Copy example to your environment file:**
   ```bash
   # Backend
   cp .env.example .env
   
   # Frontend
   cp .env.local.example .env.local
   ```

2. **Never commit sensitive values:**
   - Add `.env` to `.gitignore`
   - Use `.env.example` as template
   - Use environment variables in CI/CD

3. **Quick local testing:**
   ```bash
   # Backend
   PORT=5000 NODE_ENV=development npm start
   
   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:5000/api npm run dev
   ```
