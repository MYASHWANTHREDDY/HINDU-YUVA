/**
 * API Endpoints
 */
export const ENDPOINTS = {
  // Public endpoints
  EVENTS: '/api/events',
  NEWS: '/api/news',
  TEAM: '/api/team',
  GALLERY: '/api/gallery',
  CONTACT: '/api/contact',
  JOIN: '/api/join',
  HEALTH: '/api/health',

  // Admin endpoints
  ADMIN: {
    EVENTS: '/api/admin/events',
    NEWS: '/api/admin/news',
    TEAM: '/api/admin/team',
    GALLERY: '/api/admin/gallery',
    CONTACT_SUBMISSIONS: '/api/admin/contact-submissions',
    JOIN_SUBMISSIONS: '/api/admin/join-submissions',
  },

  // File upload
  UPLOAD: '/api/upload',
};

export default ENDPOINTS;
