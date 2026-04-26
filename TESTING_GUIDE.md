# 🧪 Testing Guide - Deccan AI Career Coach

## Manual Testing Checklist

### ✅ 1. Backend Server Tests

**Health Check:**
```bash
# Server should respond with status 200
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-04-27T10:30:00Z"
}
```

---

### ✅ 2. File Upload Tests

**Test Resume Upload:**
```bash
curl -X POST http://localhost:5000/api/upload/resume \
  -F "resume=@path/to/resume.txt"
```

**Expected Response:**
```json
{
  "success": true,
  "filename": "1712345678-resume.txt",
  "text": "Resume content...",
  "message": "Resume uploaded successfully"
}
```

**Test JD Upload:**
```bash
curl -X POST http://localhost:5000/api/upload/jd \
  -H "Content-Type: text/plain" \
  -d "Senior Developer Required..."
```

---

### ✅ 3. Assessment Flow Tests

#### Test 1: Initialize Assessment
```bash
curl -X POST http://localhost:5000/api/assessment/initialize \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "JavaScript React Node.js",
    "jdText": "JavaScript React Node.js Docker"
  }'
```

**Expected:**
- ✅ Returns sessionId
- ✅ Lists required skills
- ✅ Lists existing skills
- ✅ Identifies gaps (Docker)

#### Test 2: Get Questions
```bash
curl -X POST http://localhost:5000/api/assessment/questions \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "1712345678",
    "skill": "React"
  }'
```

**Expected:**
- ✅ Returns 5 questions
- ✅ Question text is meaningful
- ✅ Difficulty level set

#### Test 3: Submit Answer
```bash
curl -X POST http://localhost:5000/api/assessment/submit-answer \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "1712345678",
    "skill": "React",
    "answer": "React is a JavaScript library...",
    "questionId": 1
  }'
```

**Expected:**
- ✅ Score between 0-10
- ✅ Probability between 0-1
- ✅ Feedback provided
- ✅ Skill average calculated

#### Test 4: Get Results
```bash
curl -X POST http://localhost:5000/api/assessment/results \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "1712345678"}'
```

**Expected:**
- ✅ Final scores for all skills
- ✅ Learning plan generated
- ✅ Resources provided
- ✅ Timeline included

---

### ✅ 4. Frontend UI Tests

#### Home Page Tests
- [ ] Hero section loads
- [ ] Navigation bar visible
- [ ] Animations play smoothly
- [ ] Features section displays
- [ ] CTA button clickable

#### Input Section Tests
- [ ] Resume upload button clickable
- [ ] File selection works
- [ ] JD textarea accepts input
- [ ] Sample data button loads sample
- [ ] Start Assessment button enables when filled
- [ ] Error messages show for empty fields

#### Assessment Page Tests
- [ ] Progress bar updates correctly
- [ ] Questions display properly
- [ ] Chat-style interface works
- [ ] Submit button submits answer
- [ ] Score displays after answer
- [ ] Feedback message shows
- [ ] Auto-advances to next question
- [ ] Animations play smoothly

#### Results Dashboard Tests
- [ ] Skill scores display
- [ ] Confidence probabilities shown
- [ ] Skill gaps highlighted
- [ ] Learning plan generates
- [ ] Resources show links
- [ ] Download button works
- [ ] New assessment button resets
- [ ] All tabs (skills/gaps/learning) work

---

### ✅ 5. Data Validation Tests

#### Resume Upload Validation
- [ ] Accept PDF files ✅
- [ ] Accept DOCX files ✅
- [ ] Accept TXT files ✅
- [ ] Reject invalid formats ✅
- [ ] Reject files > 5MB ✅
- [ ] Extract text correctly ✅

#### JD Validation
- [ ] Accept plain text ✅
- [ ] Reject empty text ✅
- [ ] Handle special characters ✅
- [ ] Parse properly ✅

#### Answer Validation
- [ ] Accept any text ✅
- [ ] Calculate scores ✅
- [ ] Provide feedback ✅
- [ ] Store responses ✅

---

### ✅ 6. Performance Tests

#### Load Times
- [ ] Backend starts: < 2 seconds
- [ ] Frontend loads: < 3 seconds
- [ ] Assessment page: < 1 second
- [ ] Results page: < 2 seconds
- [ ] API responses: < 1 second

#### Browser Performance
- [ ] Smooth scrolling (60fps)
- [ ] Animations play smoothly
- [ ] No lag on input
- [ ] No memory leaks
- [ ] Responsive on mobile

#### Network Tests
- [ ] Handles slow connections
- [ ] Timeout gracefully
- [ ] Shows loading states
- [ ] Error handling works

---

### ✅ 7. Error Handling Tests

#### Network Errors
```javascript
// Stop backend, try to submit
// Should show: "Cannot connect to backend"
```

#### Invalid Data
```javascript
// Send empty JD + resume
// Should show: "Please upload resume and paste job description"
```

#### File Errors
```javascript
// Try uploading file > 5MB
// Should show: "File size too large"
```

#### Session Errors
```javascript
// Use invalid sessionId
// Should show: "Session not found"
```

---

### ✅ 8. Browser Compatibility Tests

**Chrome:**
- [ ] All features work
- [ ] Animations smooth
- [ ] Responsive

**Firefox:**
- [ ] All features work
- [ ] Animations smooth
- [ ] Responsive

**Safari:**
- [ ] All features work
- [ ] Animations smooth
- [ ] Responsive

**Edge:**
- [ ] All features work
- [ ] Animations smooth
- [ ] Responsive

---

### ✅ 9. Mobile Responsiveness Tests

- [ ] Layout on 320px width (iPhone SE)
- [ ] Layout on 768px width (iPad)
- [ ] Layout on 1024px width (Large tablet)
- [ ] Touch events work
- [ ] Buttons are clickable (min 44px)
- [ ] Text readable without zoom

---

### ✅ 10. Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Colors have sufficient contrast
- [ ] Form labels present
- [ ] ARIA labels used
- [ ] Screen reader friendly

---

## Automated Testing Setup (Optional)

### Unit Tests (Jest)

```bash
# Backend
cd backend
npm install --save-dev jest
npm test

# Frontend
cd frontend
npm install --save-dev @testing-library/react
npm test
```

### E2E Tests (Playwright/Cypress)

```bash
# Install
npm install --save-dev @playwright/test

# Run tests
npx playwright test
```

---

## Performance Profiling

### Chrome DevTools

1. Open DevTools (F12)
2. **Performance Tab:**
   - Record interaction
   - Check frame rate
   - Analyze bottlenecks
3. **Network Tab:**
   - Check API response times
   - Monitor file sizes
   - Look for slow requests
4. **Console:**
   - Check for errors
   - Monitor logs

---

## Test Report Template

```
Test Date: 2024-04-27
Tester: John Doe
Version: 1.0.0

RESULTS:
✅ Backend Tests: PASSED (10/10)
✅ Frontend Tests: PASSED (15/15)
✅ Performance Tests: PASSED (8/8)
✅ Browser Tests: PASSED (4/4)
✅ Mobile Tests: PASSED (6/6)

Issues Found:
- None

Recommendations:
- All systems operational
- Ready for deployment
```

---

## Regression Testing Checklist

After making changes, test:
- [ ] All endpoints still work
- [ ] UI looks correct
- [ ] Animations play smoothly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] API responses format correct

---

## Load Testing (Optional)

For scaling tests:

```bash
# Apache Bench
ab -n 100 -c 10 http://localhost:5000/api/health

# Autocannon (Node.js)
npm install -g autocannon
autocannon http://localhost:5000/api/health
```

---

## Test Data Sets

### Test Set 1: Minimal
- 1 skill gap
- 1 existing skill
- Simple answers

### Test Set 2: Standard
- 3 skill gaps
- 5 existing skills
- Detailed answers

### Test Set 3: Large
- 10+ skill gaps
- 15+ skills
- Long answers
- Large files

---

## Success Criteria

✅ **All tests pass:** Ready for release
⚠️ **Some tests fail:** Fix issues, retest
❌ **Critical failures:** Don't release

---

## Continuous Testing

For CI/CD pipeline:
1. Run unit tests on commit
2. Run E2E tests on PR
3. Performance tests nightly
4. Security scans weekly

---

Happy Testing! 🎉
