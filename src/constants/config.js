/**
 * Application Configuration Constants
 * 
 * This file contains all the configuration values used throughout the application.
 * Values can be overridden by environment variables (prefixed with VITE_).
 * 
 * @module config
 */

/**
 * Site metadata configuration
 * @type {Object}
 */
export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'Hindu YUVA at CSUF',
  url: import.meta.env.VITE_SITE_URL || 'https://hinduyuvacusf.org',
  description: 'Connecting, inspiring, and empowering Hindu youth at California State University, Fullerton.',
  tagline: 'Connect, Inspire, Empower',
};

/**
 * Google Analytics configuration
 * @type {Object}
 */
export const ANALYTICS_CONFIG = {
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

/**
 * API endpoints configuration
 * @type {Object}
 */
export const API_ENDPOINTS = {
  googleSheets: import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT || 'https://v1.nocodeapi.com/hinduyuva_csuf/google_sheets/SryTjojDbvjsnBhb?tabId=Sheet1',
  contactForm: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
};

/**
 * Social media links
 * @type {Object}
 */
export const SOCIAL_LINKS = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/hinduyuva_csuf/',
  facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/hinduyuvacusf',
  whatsapp: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890'}`,
  email: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'info@hinduyuvacusf.com'}`,
};

/**
 * Contact information
 * @type {Object}
 */
export const CONTACT_INFO = {
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@hinduyuvacusf.com',
  phone: import.meta.env.VITE_CONTACT_PHONE || '(657) 278-5555',
  location: 'CSUF, Fullerton, CA',
  address: 'California State University, Fullerton\n800 N State College Blvd\nFullerton, CA 92831',
};

/**
 * Meeting information
 * @type {Object}
 */
export const MEETING_INFO = {
  location: import.meta.env.VITE_MEETING_LOCATION || 'Student Center, Room 201',
  day: import.meta.env.VITE_MEETING_DAY || 'Friday',
  time: import.meta.env.VITE_MEETING_TIME || '5:00 PM - 7:00 PM',
};

/**
 * Navigation menu items
 * @type {Array<Object>}
 */
export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { 
    path: '/about', 
    label: 'About Us',
    subItems: [
      { path: '/about?section=mission', label: 'Mission & Vision' },
      { path: '/about?section=team', label: 'Team' },
      { path: '/about?section=timeline', label: 'Timeline' },
    ]
  },
  { path: '/events', label: 'Events' },
  { path: '/news', label: 'News' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
  { path: '/join', label: 'Join Us' },
];

/**
 * Theme configuration
 * @type {Object}
 */
export const THEME_CONFIG = {
  colors: {
    primary: '#ea580c', // Orange
    secondary: '#c2410c',
    accent: '#fb923c',
    dark: {
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
    },
    light: {
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#1f2937',
    }
  },
};

/**
 * Event categories and their colors
 * @type {Object}
 */
export const EVENT_CATEGORIES = {
  Announcement: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-300' },
  Event: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-300' },
  Service: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-300' },
  Update: { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-300' },
};

/**
 * Team members data
 * @type {Array<Object>}
 */
export const TEAM_MEMBERS = [
  { name: 'Dev Vyas', role: 'President', image: null },
  { name: 'Skanda', role: 'Vice President', image: null },
  { name: 'Shalaka Sanap', role: 'Secretary', image: null },
  { name: 'Gaurav', role: 'Treasurer', image: null },
  { name: 'Indrayani Bhoshle', role: 'Event Coordinator', image: null },
  { name: 'Kanika Sood', role: 'Faculty Advisor', image: null },
  { name: 'Yashwanth Mallareddygari', role: 'Advisor', image: null },
];

/**
 * Default image placeholders
 * @type {Object}
 */
export const PLACEHOLDERS = {
  event: '/placeholder-event.jpg',
  team: '/placeholder-team.jpg',
  gallery: '/placeholder-gallery.jpg',
};

/**
 * Animation durations (in ms)
 * @type {Object}
 */
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
};

/**
 * Breakpoints (matching Tailwind defaults)
 * @type {Object}
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
