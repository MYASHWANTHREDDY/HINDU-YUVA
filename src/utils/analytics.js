/**
 * Analytics & Monitoring Utilities
 * 
 * Google Analytics 4 integration and custom event tracking
 */

// Check if analytics is available
const isAnalyticsEnabled = () => {
  return typeof window !== 'undefined' && 
         window.gtag && 
         import.meta.env.VITE_GA_MEASUREMENT_ID;
};

/**
 * Track a page view
 * @param {string} pagePath - The page path
 * @param {string} pageTitle - The page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track an event registration/RSVP
 * @param {string} eventName - Name of the event
 * @param {string} eventId - ID of the event
 */
export const trackEventRegistration = (eventName, eventId) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'event_registration', {
    event_category: 'Events',
    event_label: eventName,
    event_id: eventId,
  });
};

/**
 * Track a form submission
 * @param {string} formName - Name of the form (contact, join)
 * @param {boolean} success - Whether submission was successful
 */
export const trackFormSubmission = (formName, success = true) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', success ? 'form_submission' : 'form_error', {
    event_category: 'Forms',
    event_label: formName,
    success: success,
  });
};

/**
 * Track navigation clicks
 * @param {string} destination - Where the user is navigating to
 */
export const trackNavigation = (destination) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'navigation', {
    event_category: 'Navigation',
    event_label: destination,
  });
};

/**
 * Track social media link clicks
 * @param {string} platform - Social media platform
 */
export const trackSocialClick = (platform) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'social_click', {
    event_category: 'Social',
    event_label: platform,
  });
};

/**
 * Track gallery interactions
 * @param {string} action - View, click, etc.
 * @param {string} albumName - Name of the album
 */
export const trackGalleryInteraction = (action, albumName) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'gallery_interaction', {
    event_category: 'Gallery',
    event_action: action,
    event_label: albumName,
  });
};

/**
 * Track theme toggle
 * @param {string} theme - 'dark' or 'light'
 */
export const trackThemeToggle = (theme) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'theme_toggle', {
    event_category: 'Preferences',
    event_label: theme,
  });
};

/**
 * Track admin login
 * @param {boolean} success - Whether login was successful
 */
export const trackAdminLogin = (success) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', success ? 'admin_login_success' : 'admin_login_failed', {
    event_category: 'Admin',
    success: success,
  });
};

/**
 * Track errors for monitoring
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 * @param {string} componentName - Where the error occurred
 */
export const trackError = (errorType, errorMessage, componentName = '') => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('event', 'exception', {
    description: `${errorType}: ${errorMessage}`,
    fatal: false,
    component: componentName,
  });
};

/**
 * Track page load performance
 */
export const trackPerformance = () => {
  if (!isAnalyticsEnabled()) return;
  
  // Wait for page to fully load
  if (document.readyState === 'complete') {
    sendPerformanceMetrics();
  } else {
    window.addEventListener('load', sendPerformanceMetrics);
  }
};

const sendPerformanceMetrics = () => {
  if (!window.performance) return;
  
  const timing = performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
  
  if (isAnalyticsEnabled()) {
    window.gtag('event', 'timing_complete', {
      name: 'page_load',
      value: loadTime,
    });
    
    window.gtag('event', 'timing_complete', {
      name: 'dom_ready',
      value: domReady,
    });
  }
};

// Export all functions
export default {
  trackPageView,
  trackEventRegistration,
  trackFormSubmission,
  trackNavigation,
  trackSocialClick,
  trackGalleryInteraction,
  trackThemeToggle,
  trackAdminLogin,
  trackError,
  trackPerformance,
};
