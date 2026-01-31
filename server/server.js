/**
 * Hindu YUVA Backend Server
 *
 * Express server for handling form submissions
 * Stores submissions in JSON file for easy management
 * 
 * SECURITY FEATURES:
 * - JWT Authentication for admin
 * - Rate limiting on form endpoints
 * - Input validation and sanitization
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
import logger from './logger.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'hindu-yuva-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123@HY_CSUF';

// Data file paths
const dataDir = path.join(__dirname, 'data');
const contactDataFile = path.join(dataDir, 'contact-submissions.json');
const joinDataFile = path.join(dataDir, 'join-submissions.json');

// Upload directory
const uploadsDir = path.join(__dirname, 'uploads');

// Content data file paths (in server/data)
const eventsDataFile = path.join(dataDir, 'events.json');
const newsDataFile = path.join(dataDir, 'news.json');
const teamDataFile = path.join(dataDir, 'team.json');
const galleryDataFile = path.join(dataDir, 'gallery.json');

// ==========================================
// RATE LIMITING
// ==========================================

// Rate limiter for form submissions (5 requests per 15 minutes)
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for login attempts (5 attempts per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter (100 requests per minute)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for videos
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

// ==========================================
// MIDDLEWARE
// ==========================================

// Build CORS origin list from defaults + environment
const corsOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://hinduyuvacusf.org',
  'https://hinduyuva-csuf.vercel.app',
];

// Add production frontend URL if configured
if (process.env.FRONTEND_URL) {
  corsOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(apiLimiter);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path !== '/api/health') { // Skip health checks
      logger.request(req, res.statusCode);
    }
  });
  next();
});

// Serve uploaded images as static files
app.use('/uploads', express.static(uploadsDir));

// ==========================================
// JWT AUTHENTICATION MIDDLEWARE
// ==========================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// ==========================================
// INPUT VALIDATION HELPERS
// ==========================================

function validateEmail(email) {
  return validator.isEmail(email);
}

function validatePhone(phone) {
  if (!phone) return true; // Phone is optional
  // Allow various phone formats
  return validator.isMobilePhone(phone.replace(/[\s\-\(\)]/g, ''), 'any', { strictMode: false });
}

function sanitizeInput(input, maxLength = 1000) {
  if (!input) return '';
  return validator.escape(input.trim()).substring(0, maxLength);
}

// ==========================================
// DATA UTILITIES
// ==========================================

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function ensureDataFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
}

ensureDataFile(contactDataFile);
ensureDataFile(joinDataFile);
ensureDataFile(eventsDataFile);
ensureDataFile(newsDataFile);
ensureDataFile(teamDataFile);
ensureDataFile(galleryDataFile);

function readSubmissions(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeSubmissions(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
}

// ==========================================
// PUBLIC ENDPOINTS
// ==========================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hindu YUVA backend is running!' });
});

/**
 * Contact Form Endpoint (with rate limiting and validation)
 * POST /api/contact
 */
app.post('/api/contact', formLimiter, (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    if (phone && !validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number',
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (max 5000 characters)',
      });
    }

    // Create submission object with sanitized data
    const submission = {
      id: Date.now(),
      name: sanitizeInput(name, 100),
      email: validator.normalizeEmail(email) || email.trim(),
      phone: sanitizeInput(phone, 20),
      subject: sanitizeInput(subject, 200) || 'No subject',
      message: sanitizeInput(message, 5000),
      submittedAt: new Date().toISOString(),
    };

    const submissions = readSubmissions(contactDataFile);
    submissions.push(submission);
    const success = writeSubmissions(contactDataFile, submissions);

    if (success) {
      logger.formSubmission('contact', email);
      res.status(201).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        submissionId: submission.id,
      });
    } else {
      throw new Error('Failed to save submission');
    }
  } catch (error) {
    logger.error('Contact form error', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to submit form. Please try again.',
    });
  }
});

/**
 * Join Form Endpoint (with rate limiting and validation)
 * POST /api/join
 */
app.post('/api/join', formLimiter, (req, res) => {
  try {
    const { name, email, phone, interests } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    if (phone && !validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number',
      });
    }

    // Create submission object with sanitized data
    const submission = {
      id: Date.now(),
      name: sanitizeInput(name, 100),
      email: validator.normalizeEmail(email) || email.trim(),
      phone: sanitizeInput(phone, 20),
      interests: sanitizeInput(interests, 500),
      submittedAt: new Date().toISOString(),
    };

    const submissions = readSubmissions(joinDataFile);
    submissions.push(submission);
    const success = writeSubmissions(joinDataFile, submissions);

    if (success) {
      logger.formSubmission('join', email);
      res.status(201).json({
        success: true,
        message: 'Welcome! We will contact you soon.',
        submissionId: submission.id,
      });
    } else {
      throw new Error('Failed to save submission');
    }
  } catch (error) {
    logger.error('Join form error', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Failed to submit form. Please try again.',
    });
  }
});

/**
 * Google Sheets Proxy Endpoint (prevents exposing API key in frontend)
 * POST /api/sheets/submit
 */
app.post('/api/sheets/submit', formLimiter, async (req, res) => {
  try {
    const { name, email, phone, interests, type } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    // Google Sheets API endpoint (keep secret on server)
    const SHEETS_ENDPOINT = process.env.GOOGLE_SHEETS_ENDPOINT;
    
    if (!SHEETS_ENDPOINT) {
      // If no sheets endpoint configured, just save locally
      console.info('Google Sheets endpoint not configured, saving locally only');
      return res.json({ success: true, message: 'Saved locally' });
    }

    const response = await fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        Name: sanitizeInput(name, 100),
        Email: validator.normalizeEmail(email) || email.trim(),
        Phone: sanitizeInput(phone, 20),
        Interests: sanitizeInput(interests, 500),
        Type: type || 'join',
        Date: new Date().toISOString(),
      }]),
    });

    if (response.ok) {
      res.json({ success: true, message: 'Submitted to Google Sheets' });
    } else {
      throw new Error('Google Sheets API error');
    }
  } catch (error) {
    console.error('Error in sheets proxy:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit. Please try again.',
    });
  }
});

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

/**
 * Admin Login - Returns JWT token
 * POST /api/admin/login
 */
app.post('/api/admin/login', loginLimiter, (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required',
      });
    }

    // Verify password
    if (password !== ADMIN_PASSWORD) {
      logger.security('Failed login attempt', { ip: req.ip });
      return res.status(401).json({
        success: false,
        error: 'Invalid password',
      });
    }

    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.adminAction('Login successful', { ip: req.ip });
    res.json({
      success: true,
      token,
      expiresIn: 86400, // 24 hours in seconds
    });
  } catch (error) {
    logger.error('Login error', { error: error.message });
    res.status(500).json({
      success: false,
      error: 'Login failed. Please try again.',
    });
  }
});

/**
 * Verify token validity
 * GET /api/admin/verify
 */
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});

// ==========================================
// PROTECTED ADMIN ENDPOINTS (require JWT)
// ==========================================

/**
 * Get all contact submissions
 */
app.get('/api/admin/contact-submissions', authenticateToken, (req, res) => {
  const submissions = readSubmissions(contactDataFile);
  res.json({
    count: submissions.length,
    submissions: submissions.reverse(),
  });
});

/**
 * Delete a contact submission
 */
app.delete('/api/admin/contact-submissions/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const submissions = readSubmissions(contactDataFile);
    const filtered = submissions.filter(s => s.id !== id);
    
    if (filtered.length === submissions.length) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    writeSubmissions(contactDataFile, filtered);
    res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

/**
 * Get all join submissions
 */
app.get('/api/admin/join-submissions', authenticateToken, (req, res) => {
  const submissions = readSubmissions(joinDataFile);
  res.json({
    count: submissions.length,
    submissions: submissions.reverse(),
  });
});

// ==========================================
// EVENTS CRUD ENDPOINTS
// ==========================================

app.get('/api/events', (req, res) => {
  try {
    const events = readSubmissions(eventsDataFile);
    res.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/admin/events', authenticateToken, (req, res) => {
  try {
    const { events } = req.body;
    writeSubmissions(eventsDataFile, events);
    res.json({ success: true, message: 'Events saved successfully' });
  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({ error: 'Failed to save events' });
  }
});

// ==========================================
// NEWS CRUD ENDPOINTS
// ==========================================

app.get('/api/news', (req, res) => {
  try {
    const news = readSubmissions(newsDataFile);
    res.json({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/admin/news', authenticateToken, (req, res) => {
  try {
    const { news } = req.body;
    writeSubmissions(newsDataFile, news);
    res.json({ success: true, message: 'News saved successfully' });
  } catch (error) {
    console.error('Error saving news:', error);
    res.status(500).json({ error: 'Failed to save news' });
  }
});

// ==========================================
// FILE UPLOAD ENDPOINT
// ==========================================

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  try {
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'File uploaded successfully',
      imagePath: imagePath,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// ==========================================
// TEAM CRUD ENDPOINTS
// ==========================================

app.get('/api/team', (req, res) => {
  try {
    const team = readSubmissions(teamDataFile);
    res.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

app.post('/api/admin/team', authenticateToken, (req, res) => {
  try {
    const { team } = req.body;
    writeSubmissions(teamDataFile, team);
    res.json({ success: true, message: 'Team saved successfully' });
  } catch (error) {
    console.error('Error saving team:', error);
    res.status(500).json({ error: 'Failed to save team' });
  }
});

// ==========================================
// GALLERY CRUD ENDPOINTS
// ==========================================

app.get('/api/gallery', (req, res) => {
  try {
    const gallery = readSubmissions(galleryDataFile);
    res.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.post('/api/admin/gallery', authenticateToken, (req, res) => {
  try {
    const { gallery } = req.body;
    writeSubmissions(galleryDataFile, gallery);
    res.json({ success: true, message: 'Gallery saved successfully' });
  } catch (error) {
    console.error('Error saving gallery:', error);
    res.status(500).json({ error: 'Failed to save gallery' });
  }
});

// ==========================================
// ERROR HANDLING
// ==========================================

app.use((err, req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.info(`
╔════════════════════════════════════════╗
║   Hindu YUVA Backend Server Running    ║
╚════════════════════════════════════════╝
📍 Server: http://localhost:${PORT}
✅ Health: http://localhost:${PORT}/api/health
🔐 Login: POST http://localhost:${PORT}/api/admin/login
📋 Contact: POST http://localhost:${PORT}/api/contact
👥 Join: POST http://localhost:${PORT}/api/join

Security Features:
  ✓ JWT Authentication
  ✓ Rate Limiting (5 req/15min for forms)
  ✓ Input Validation & Sanitization
  `);
});

export default app;
