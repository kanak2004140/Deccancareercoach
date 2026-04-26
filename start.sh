#!/bin/bash

# Deccan Career Coach - Quick Start Script

echo "🚀 Starting Deccan AI Career Coach..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Start Backend
echo "📚 Starting Backend Server..."
cd backend
npm install --silent > /dev/null 2>&1
npm start &
BACKEND_PID=$!
echo "✅ Backend running on http://localhost:5000 (PID: $BACKEND_PID)"

# Wait for backend to start
sleep 2

# Start Frontend
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm install --silent > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend running on http://localhost:3000 (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Deccan AI Career Coach is ready!"
echo "📱 Open your browser: http://localhost:3000"
echo ""
echo "To stop servers, press Ctrl+C"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
