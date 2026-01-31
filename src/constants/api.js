/**
 * API Configuration
 * 
 * Centralized API URL and helper functions
 * Import this in any file that needs to make API calls
 */

// Server Base URL - uses environment variable in production, localhost in development
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Uploads URL for images
export const UPLOADS_URL = `${API_URL}/uploads`;

/**
 * Get full image URL for uploaded images
 * @param {string} imagePath - The image path from the server
 * @returns {string} The full URL to the image
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads')) return `${API_URL}${imagePath}`;
  return imagePath;
}

export default API_URL;
