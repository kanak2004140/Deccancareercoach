# 🚀 Getting Started with Deccan AI Career Coach

## 1️⃣ Prerequisites

Before you start, make sure you have:
- **Node.js 16 or higher** - Download from [nodejs.org](https://nodejs.org)
- **npm** or **yarn** - Comes with Node.js
- **A modern web browser** - Chrome, Firefox, Safari, or Edge
- **5-10 minutes** for setup

Check your installations:
```bash
node --version   # Should show v16.0.0 or higher
npm --version    # Should show 8.0.0 or higher
```

---

## 2️⃣ Quick Installation

### Option A: Using Windows (Easiest)
```bash
# 1. Navigate to project directory
cd path\to\deccancareercoach

# 2. Double-click start.bat file
# This will open two windows:
#   - Backend console (Port 5000)
#   - Frontend console (Port 3000)

# 3. Open browser: http://localhost:3000
```

### Option B: Using macOS/Linux
```bash
# 1. Navigate to project directory
cd path/to/deccancareercoach

# 2. Make script executable
chmod +x start.sh

# 3. Run the script
./start.sh

# 4. Open browser: http://localhost:3000
```

### Option C: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
# Server starts on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# App starts on http://localhost:3000
```

---

## 3️⃣ Using the Application

### Step 1: Upload Resume
1. Click "Choose Resume File"
2. Select a PDF, DOCX, or TXT file from your computer
3. File should be uploaded within seconds
4. ✅ You'll see a confirmation message

### Step 2: Paste Job Description
1. Click the "Paste Job Description" text area
2. Copy-paste the entire job description
3. Or use the sample JD provided
4. Job description should appear in the text area

### Step 3: Start Assessment
1. Click "Start Assessment" button
2. Wait for processing (1-2 seconds)
3. You'll be taken to the assessment page

### Step 4: Answer Questions
1. Read the AI question carefully
2. Type your answer in detail
3. Click the send button (✈️ icon)
4. Get instant feedback and score
5. Move to next question
6. Repeat for all skills

### Step 5: View Results
1. After completing all skill assessments
2. Dashboard shows:
   - Skill scores (0-10)
   - Confidence probability
   - Skill gaps identified
   - Personalized learning plan
3. Download results as JSON
4. Start a new assessment

---

## 4️⃣ Sample Data (For Testing)

### Quick Test with Sample Data

**Sample Resume Content:**
```
Senior Full Stack Developer
JavaScript | React | Node.js | MongoDB | AWS | Docker

Experience:
- 5 years building web applications
- Led teams of 3+ developers
- Optimized performance by 40%
- Deployed to AWS & Docker environments

Skills: JavaScript, React, Node.js, MongoDB, Docker, AWS
```

**Sample Job Description:**
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

**Expected Results:**
- ✅ JavaScript: 9/10 (Expert)
- ✅ React: 8/10 (Proficient)
- ✅ Node.js: 7/10 (Intermediate)
- ⚠️ GraphQL: 0/10 (Gap)
- ⚠️ PostgreSQL: 0/10 (Gap)

---

## 5️⃣ Features Explained

### 📊 Skill Assessment
- AI asks targeted questions
- Evaluates your understanding
- Scores based on relevance, depth, clarity
- Real-time feedback on each answer

### 🎯 Skill Gap Analysis
- Identifies missing skills
- Prioritizes by importance
- Suggests learning order
- Shows current vs required level

### 📚 Learning Roadmap
- Curated resources per skill
- Estimated learning time
- Links to courses, docs, tutorials
- Priority-based ordering

### 💬 Chat Interface
- Natural conversation style
- Typing animations
- Instant scoring feedback
- Progress tracking

---

## 6️⃣ Troubleshooting

### ❌ "Cannot connect to backend"
**Solution:**
1. Check if backend is running (Terminal shows "✅ Server running")
2. Verify `.env` file has `CORS_ORIGIN=http://localhost:3000`
3. Restart backend: `npm start` in backend folder
4. Refresh browser (Ctrl+R or Cmd+R)

### ❌ "File upload failed"
**Solution:**
1. Check file size (max 5MB)
2. Use supported format: PDF, DOCX, or TXT
3. Ensure file has content
4. Try a different file
5. Check backend console for errors

### ❌ "Assessment won't start"
**Solution:**
1. Ensure resume is uploaded (file name shows)
2. Job description is not empty
3. Both fields have content
4. No error messages in console
5. Wait 2-3 seconds for processing

### ❌ "Animations are choppy"
**Solution:**
1. Use latest browser (Chrome/Firefox/Safari)
2. Check hardware acceleration enabled
3. Close other browser tabs
4. Restart browser
5. Clear cache (Ctrl+Shift+Delete)

### ❌ "Port 3000 or 5000 already in use"
**Solution:**
```bash
# Find and kill process using port
# macOS/Linux:
lsof -i :5000  # Find process
kill -9 <PID>  # Kill it

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 7️⃣ File Structure Reference

```
deccancareercoach/
├── backend/                 # Express.js server
│   ├── src/routes/         # API endpoints
│   ├── src/utils/          # LLM & helpers
│   ├── uploads/            # Uploaded files
│   ├── server.js           # Main server
│   └── package.json
│
├── frontend/               # Next.js app
│   ├── pages/             # Page components
│   ├── components/        # React components
│   ├── styles/            # Global styles
│   └── package.json
│
├── README.md              # Main documentation
├── API_EXAMPLES.json      # API response samples
├── SAMPLE_RESUME.md       # Example resume
├── SAMPLE_JD.md          # Example job description
└── start.sh/.bat         # Quick start scripts
```

---

## 8️⃣ Advanced Configuration

### Customize Skills
Edit `backend/src/utils/llm.js`:
```javascript
export const generateAssessmentQuestions = async (skill, proficiency) => {
  // Add your custom questions here
};
```

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'neon-purple': '#9d4edd',  // Change this
  'neon-blue': '#00d4ff',    // Or this
}
```

### Modify UI Components
Edit components in `frontend/components/`:
- `Hero.js` - Hero section
- `InputSection.js` - Upload area
- `SkillAssessment.js` - Chat interface
- `ResultsDashboard.js` - Results view

---

## 9️⃣ API Endpoints Reference

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Initialize Assessment
```bash
curl -X POST http://localhost:5000/api/assessment/initialize \
  -H "Content-Type: application/json" \
  -d '{"resumeText":"...", "jdText":"..."}'
```

### Get Questions
```bash
curl -X POST http://localhost:5000/api/assessment/questions \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"123", "skill":"React"}'
```

---

## 🔟 Performance Tips

✅ **For Smooth Experience:**
- Use Chrome/Firefox (fastest)
- Close unnecessary browser tabs
- Disable browser extensions (especially ad-blockers)
- Use wired internet (if possible)
- Clear browser cache monthly

✅ **For Best Results:**
- Provide detailed answers (50+ words)
- Use technical terminology
- Include examples in answers
- Answer all questions
- Take your time (no rush)

---

## 🔐 Security Notes

⚠️ **Important:**
- Don't upload sensitive resume info
- Use demo data for testing
- Store results securely
- Backend is local-only
- No data sent to external servers

---

## 📞 Support & Help

**Still having issues?**

1. **Check Logs:**
   - Backend: Look at terminal running `npm start`
   - Frontend: Open browser DevTools (F12)
   - Console tab shows detailed errors

2. **Clear Cache:**
   ```bash
   # Frontend cache
   Ctrl+Shift+Delete (Browser)
   
   # Node modules (if needed)
   rm -rf node_modules
   npm install
   ```

3. **Restart Everything:**
   - Close both terminals
   - Kill any Node processes
   - Run `start.sh` or `start.bat` again

---

## 🎯 Next Steps

After setup, you can:
1. ✅ Test with sample data
2. 📝 Try with your own resume
3. 🎨 Customize colors & questions
4. 🚀 Deploy to production
5. 🔗 Integrate with real LLM APIs
6. 💾 Add database integration

---

## 🎉 You're All Set!

Your Deccan AI Career Coach is ready to use!

**Open now:** http://localhost:3000

Enjoy! 🚀

---

**Questions?** Check README.md for detailed documentation.
