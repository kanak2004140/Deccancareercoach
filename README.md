# Deccan AI Career Coach - Complete Setup Guide

🎓 AI-Powered Skill Assessment & Personalized Learning Plan Agent

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- A modern web browser

### Installation

#### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (already included):
```
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:3000
```

Start backend:
```bash
npm start
# Server runs on http://localhost:5000
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file (already included):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
# App runs on http://localhost:3000
```

#### 3. Access the Application

Open your browser and visit: **http://localhost:3000**

---

## 📋 Features

### 1. **Smart Skill Analysis**
   - Upload resume (PDF, DOCX, TXT)
   - Paste job description
   - AI extracts required vs existing skills
   - Automatic gap identification

### 2. **Conversational Assessment**
   - Chat-style interface
   - AI asks targeted questions
   - Real-time feedback
   - Confidence scoring

### 3. **Performance Scoring**
   - 0-10 scale scoring
   - Probability confidence metrics
   - Per-skill assessment
   - Average calculations

### 4. **Learning Roadmap**
   - Priority-based skill ordering
   - Curated resources (YouTube, courses, docs)
   - Time estimates for each skill
   - Adjacent skill recommendations

### 5. **Beautiful Dashboard**
   - Dark theme with neon accents
   - Glassmorphism design
   - Smooth animations (Framer Motion)
   - Responsive layout
   - Real-time progress tracking

---

## 🏗️ Project Structure

```
deccancareercoach/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── upload.js       # File upload endpoints
│   │   │   └── assessment.js   # Assessment logic
│   │   ├── utils/
│   │   │   └── llm.js          # LLM & utility functions
│   │   └── uploads/            # Uploaded files storage
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── pages/
    │   ├── _app.js             # Next.js app wrapper
    │   ├── _document.js        # HTML document
    │   ├── index.js            # Home page
    │   └── assessment.js       # Assessment page
    ├── components/
    │   ├── Navigation.js       # Top nav
    │   ├── Hero.js             # Hero section
    │   ├── InputSection.js     # Upload/input UI
    │   ├── ProgressBar.js      # Assessment progress
    │   ├── SkillAssessment.js  # Chat interface
    │   └── ResultsDashboard.js # Results view
    ├── styles/
    │   └── globals.css         # Global styles & animations
    ├── utils/
    │   └── api.js              # API client
    ├── public/                 # Static assets
    ├── tailwind.config.js
    ├── next.config.js
    └── package.json
```

---

## 🔌 API Endpoints

### Upload Endpoints

#### Upload Resume
```
POST /api/upload/resume
Content-Type: multipart/form-data

Response:
{
  "success": true,
  "filename": "...",
  "text": "Resume content preview",
  "message": "Resume uploaded successfully"
}
```

#### Upload Job Description
```
POST /api/upload/jd
Content-Type: text/plain

Response:
{
  "success": true,
  "text": "JD content",
  "message": "Job description received successfully"
}
```

### Assessment Endpoints

#### Initialize Assessment
```
POST /api/assessment/initialize
Content-Type: application/json

Request:
{
  "resumeText": "Resume content...",
  "jdText": "Job description..."
}

Response:
{
  "sessionId": "1712345678",
  "requiredSkills": ["JavaScript", "React", ...],
  "existingSkills": ["JavaScript", "HTML", ...],
  "skillGaps": ["React", "Node.js", ...],
  "totalSkills": 7,
  "gapCount": 3
}
```

#### Get Assessment Questions
```
POST /api/assessment/questions
Content-Type: application/json

Request:
{
  "sessionId": "1712345678",
  "skill": "React"
}

Response:
{
  "skill": "React",
  "proficiency": "Advanced",
  "questions": [
    {
      "id": 1,
      "question": "Explain component lifecycle...",
      "skill": "React"
    },
    ...
  ]
}
```

#### Submit Answer
```
POST /api/assessment/submit-answer
Content-Type: application/json

Request:
{
  "sessionId": "1712345678",
  "skill": "React",
  "answer": "Components have lifecycle methods...",
  "questionId": 1
}

Response:
{
  "score": 8,
  "probability": 0.85,
  "feedback": "Good understanding...",
  "skillAverageScore": 7.5,
  "responseCount": 2
}
```

#### Get Final Results
```
POST /api/assessment/results
Content-Type: application/json

Request:
{
  "sessionId": "1712345678"
}

Response:
{
  "sessionId": "1712345678",
  "skillScores": [
    {
      "skill": "React",
      "score": 8,
      "probability": 0.85,
      "assessmentCount": 5
    },
    ...
  ],
  "skillGaps": ["Docker", "Kubernetes"],
  "learningPlan": [
    {
      "skill": "Docker",
      "priority": 1,
      "timeToLearn": "2-3 weeks",
      "resources": [...]
    },
    ...
  ],
  "summary": {
    "totalSkillsAssessed": 7,
    "skillsWithGaps": 2,
    "averageScore": 7,
    "estimatedLearningTime": "8-12 weeks"
  }
}
```

---

## 🎨 UI Components & Animations

### Animations Included
- ✨ Fade-in + slide-up sections
- 🎯 Floating UI elements with pulse
- 💫 Neon glow effects
- 🔄 Smooth transitions between steps
- 📊 Animated progress bars
- 💬 Chat message animations
- 🎬 Staggered container animations

### Design Features
- **Dark Theme**: Deep navy/black gradient background
- **Neon Accents**: Purple (#9d4edd) and Blue (#00d4ff) highlights
- **Glassmorphism**: Blurred cards with soft borders
- **Smooth Shadows**: Layered depth with neon glows
- **Typography**: Clean, modern sans-serif (Inter font)
- **Responsive**: Mobile-first approach

---

## 📊 Sample Input/Output

### Sample Resume
```
Senior Full Stack Developer
JavaScript | React | Node.js | MongoDB | AWS

Experience:
- 5 years building web applications
- Led teams of 3+ developers
- Optimized performance by 40%
- Deployed to AWS & Docker environments
```

### Sample Job Description
```
Senior Full Stack Developer

Requirements:
- 5+ years JavaScript/TypeScript
- React.js expertise
- Node.js & Express
- MongoDB & PostgreSQL
- AWS & Docker
- REST API & GraphQL
```

### Sample Assessment Results
```json
{
  "skillScores": [
    {
      "skill": "JavaScript",
      "score": 9,
      "probability": 0.95,
      "assessmentCount": 5
    },
    {
      "skill": "React",
      "score": 8,
      "probability": 0.85,
      "assessmentCount": 5
    },
    {
      "skill": "Docker",
      "score": 2,
      "probability": 0.3,
      "assessmentCount": 5
    }
  ],
  "skillGaps": ["Docker", "Kubernetes", "PostgreSQL"],
  "summary": {
    "averageScore": 7,
    "estimatedLearningTime": "8-12 weeks"
  }
}
```

---

## 🔧 Advanced Configuration

### Backend

**Environment Variables** (`.env`):
```
PORT=5000                          # Server port
NODE_ENV=development               # Environment
OPENAI_API_KEY=your_key           # For LLM calls (optional)
CORS_ORIGIN=http://localhost:3000 # Frontend URL
```

### Frontend

**Environment Variables** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Deployment

### Backend (Express)
```bash
# Build
npm run build

# Deploy to Heroku, Railway, Vercel, etc.
git push heroku main
```

### Frontend (Next.js)
```bash
# Build
npm run build

# Deploy to Vercel
vercel deploy

# Or Netlify
netlify deploy
```

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend `.env` has correct `CORS_ORIGIN`
- Verify frontend `.env.local` has correct API URL
- Restart both servers

### File Upload Issues
- Check file size (max 5MB)
- Allowed formats: PDF, TXT, DOCX
- Ensure `uploads/` directory exists

### Assessment Not Starting
- Verify resume and JD are not empty
- Check browser console for errors
- Ensure backend is running

### Animations Not Playing
- Use modern browser (Chrome, Firefox, Safari, Edge)
- Check Framer Motion is installed: `npm list framer-motion`

---

## 📚 Technologies Used

### Backend
- **Express.js** - Web framework
- **Multer** - File uploads
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Frontend
- **Next.js** - React framework
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

---

## 💡 Future Enhancements

- [ ] Real LLM integration (OpenAI GPT-4)
- [ ] Video interview recording
- [ ] Resume parsing with ML
- [ ] Industry benchmarks
- [ ] Peer comparison
- [ ] Certificate generation
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration
- [ ] Database integration (MongoDB)
- [ ] User authentication & profiles

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

## 👨‍💻 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoint documentation
3. Inspect browser console for errors
4. Check backend logs with `npm start`

---

## 🎯 Quick Tips

✅ **Before starting assessment:**
- Ensure both backend and frontend are running
- Clear browser cache if styles look odd
- Check console for any error messages

✅ **For best experience:**
- Use Chrome/Firefox/Safari (modern versions)
- Ensure stable internet connection
- Upload clear, well-formatted resume
- Provide complete job description

✅ **Customization:**
- Modify skills in `backend/src/utils/llm.js`
- Change colors in `frontend/tailwind.config.js`
- Add new questions in assessment logic
- Customize resources list

---

**Happy Learning! 🚀**
