/**
 * Google Analytics Utility
 * 
 * This module provides helper functions to track custom events in Google Analytics
 * 
 * Setup:
 * 1. Replace 'G-XXXXXXXXXX' in index.html with your actual Google Analytics ID
 * 2. Use these functions to track custom events throughout the application
 */

export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

/**
 * Track page view
 * @param {string} pageName - Name of the page/section
 */
export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_path: window.location.pathname,
  });
};

/**
 * Track event registration/RSVP
 * @param {string} eventName - Name of the event
 * @param {number} attendees - Number of attendees (optional)
 */
export const trackEventRegistration = (eventName, attendees = 1) => {
  trackEvent('event_registration', {
    event_name: eventName,
    attendees: attendees,
  });
};

/**
 * Track form submission
 * @param {string} formName - Name of the form (e.g., 'contact_form', 'join_form')
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form_submission', {
    form_name: formName,
  });
};

/**
 * Track social media clicks
 * @param {string} platform - Social media platform (e.g., 'instagram', 'facebook')
 */
export const trackSocialClick = (platform) => {
  trackEvent('social_click', {
    platform: platform,
  });
};

/**
 * Track navigation
 * @param {string} navigationItem - Item that was clicked
 */
export const trackNavigation = (navigationItem) => {
  trackEvent('navigation', {
    item: navigationItem,
  });
};

/**
 * Track theme toggle
 * @param {string} theme - 'light' or 'dark'
 */
export const trackThemeToggle = (theme) => {
  trackEvent('theme_toggle', {
    theme: theme,
  });
};

/**
 * Example Usage in Components:
 * 
 * import { trackEventRegistration, trackPageView } from '../utils/analytics';
 * 
 * // In a component
 * useEffect(() => {
 *   trackPageView('Events Page');
 * }, []);
 * 
 * // On form submission
 * const handleRsvp = () => {
 *   trackEventRegistration('Diwali Night', 1);
 *   // Submit form...
 * };
 */
