import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { extractResumeText } from '../utils/llm.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Use memory storage in production, disk storage in development
const storage = process.env.NODE_ENV === 'production' 
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
    });

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/**
 * Upload Resume
 */
router.post('/resume', upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let resumeText;
    
    // Handle both memory and disk storage
    if (process.env.NODE_ENV === 'production') {
      // Memory storage - use buffer
      resumeText = extractResumeText(req.file.buffer);
    } else {
      // Disk storage - use file path
      resumeText = extractResumeText(req.file.path);
    }
    
    res.json({
      success: true,
      filename: req.file.originalname,
      text: resumeText.substring(0, 5000), // Return first 5000 chars
      message: 'Resume uploaded successfully'
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Upload Job Description
 */
router.post('/jd', express.text({ limit: '10mb' }), (req, res) => {
  try {
    const jdText = req.body;
    
    if (!jdText || jdText.trim().length === 0) {
      return res.status(400).json({ error: 'No job description provided' });
    }

    res.json({
      success: true,
      text: jdText,
      message: 'Job description received successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
