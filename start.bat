@echo off
REM Deccan Career Coach - Quick Start Script (Windows)

echo 🚀 Starting Deccan AI Career Coach...
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org
    exit /b 1
)

echo ✅ Node.js version:
node -v
echo.

REM Start Backend
echo 📚 Starting Backend Server...
cd backend
call npm install >nul 2>&1
echo ✅ Backend running on http://localhost:5000
start cmd /k npm start

REM Wait a bit for backend to start
timeout /t 2 /nobreak

REM Start Frontend
echo 🎨 Starting Frontend Server...
cd ..\frontend
call npm install >nul 2>&1
echo ✅ Frontend running on http://localhost:3000
start cmd /k npm run dev

echo.
echo 🎉 Deccan AI Career Coach is ready!
echo 📱 Open your browser: http://localhost:3000
echo.
echo To stop servers, close the command windows or press Ctrl+C
echo.

timeout /t -1
