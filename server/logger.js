/**
 * Server Logging Utility
 * 
 * Provides structured logging for monitoring and debugging
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log directory
const logDir = path.join(__dirname, 'logs');

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Get current date for log file name
const getLogFileName = () => {
  const date = new Date().toISOString().split('T')[0];
  return path.join(logDir, `${date}.log`);
};

// Format log message
const formatLog = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}\n`;
};

// Write to log file
const writeLog = (level, message, meta = {}) => {
  const logMessage = formatLog(level, message, meta);
  
  // Console output with color
  const colors = {
    ERROR: '\x1b[31m',   // Red
    WARN: '\x1b[33m',    // Yellow
    INFO: '\x1b[36m',    // Cyan
    DEBUG: '\x1b[90m',   // Gray
  };
  const reset = '\x1b[0m';
  
  console.log(`${colors[level] || ''}${logMessage.trim()}${reset}`);
  
  // Write to file (async, non-blocking)
  fs.appendFile(getLogFileName(), logMessage, (err) => {
    if (err) console.error('Failed to write log:', err);
  });
};

// Logger object
const logger = {
  error: (message, meta = {}) => writeLog(LOG_LEVELS.ERROR, message, meta),
  warn: (message, meta = {}) => writeLog(LOG_LEVELS.WARN, message, meta),
  info: (message, meta = {}) => writeLog(LOG_LEVELS.INFO, message, meta),
  debug: (message, meta = {}) => writeLog(LOG_LEVELS.DEBUG, message, meta),
  
  // Log HTTP request
  request: (req, statusCode = 200) => {
    const message = `${req.method} ${req.path}`;
    const meta = {
      status: statusCode,
      ip: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('User-Agent')?.substring(0, 50),
    };
    writeLog(statusCode >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO, message, meta);
  },
  
  // Log admin action
  adminAction: (action, details = {}) => {
    writeLog(LOG_LEVELS.INFO, `ADMIN: ${action}`, details);
  },
  
  // Log form submission
  formSubmission: (formType, email) => {
    const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
    writeLog(LOG_LEVELS.INFO, `Form submitted: ${formType}`, { email: maskedEmail });
  },
  
  // Log security event
  security: (event, details = {}) => {
    writeLog(LOG_LEVELS.WARN, `SECURITY: ${event}`, details);
  },
};

export default logger;
