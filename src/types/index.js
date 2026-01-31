/**
 * Type Definitions for Hindu YUVA Website
 *
 * This file contains TypeScript type definitions and JSDoc typedefs
 * that can be used throughout the application for better type safety.
 *
 * @module types
 */

/**
 * @typedef {Object} Event
 * @property {number} id - Unique event ID
 * @property {string} title - Event title
 * @property {string} date - Event date string
 * @property {string} time - Event time range
 * @property {string} location - Event location
 * @property {string} image - Event image URL
 * @property {string} description - Short description
 * @property {string} details - Full event details
 * @property {number} attendees - Number of interested attendees
 * @property {'Past' | 'Upcoming'} type - Event type
 */

/**
 * @typedef {Object} NewsItem
 * @property {number} id - Unique news ID
 * @property {string} title - News title
 * @property {string} date - Publication date
 * @property {Date} timestamp - Date object for sorting
 * @property {string} author - Author name
 * @property {'Announcement' | 'Event' | 'Service' | 'Update'} category - News category
 * @property {string | null} image - Optional image URL
 * @property {string} description - Short description
 * @property {string} details - Full news content
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} name - Member name
 * @property {string} role - Member role/position
 * @property {string | null} image - Profile image URL
 * @property {string} [bio] - Optional biography
 * @property {string} [email] - Optional email
 * @property {SocialLinks} [social] - Optional social links
 */

/**
 * @typedef {Object} SocialLinks
 * @property {string} [instagram] - Instagram URL
 * @property {string} [linkedin] - LinkedIn URL
 * @property {string} [twitter] - Twitter URL
 */

/**
 * @typedef {Object} NavItem
 * @property {string} path - Route path
 * @property {string} label - Display label
 * @property {NavItem[]} [subItems] - Optional sub-menu items
 */

/**
 * @typedef {Object} ContactFormData
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} [phone] - Optional phone number
 * @property {string} subject - Message subject
 * @property {string} message - Message content
 */

/**
 * @typedef {Object} JoinFormData
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} [phone] - Optional phone number
 * @property {string} interests - Areas of interest
 */

/**
 * @typedef {Object} RsvpFormData
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} [phone] - Optional phone number
 * @property {number} [eventId] - Event ID for RSVP
 */

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * @typedef {Object} ThemeContextValue
 * @property {boolean} isDarkMode - Whether dark mode is active
 * @property {() => void} toggleTheme - Function to toggle theme
 */

/**
 * @typedef {Object} SiteConfig
 * @property {string} name - Site name
 * @property {string} url - Site URL
 * @property {string} description - Site description
 * @property {string} tagline - Site tagline
 */

/**
 * @typedef {Object} AnalyticsEvent
 * @property {string} eventName - Event name
 * @property {Object} [eventData] - Optional event data
 */

/**
 * Button component variants
 * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} ButtonVariant
 */

/**
 * Button component sizes
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * Badge component variants
 * @typedef {'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'} BadgeVariant
 */

/**
 * Alert component variants
 * @typedef {'info' | 'success' | 'warning' | 'error'} AlertVariant
 */

/**
 * Modal component sizes
 * @typedef {'sm' | 'md' | 'lg' | 'xl' | 'full'} ModalSize
 */

/**
 * Image object fit options
 * @typedef {'cover' | 'contain' | 'fill' | 'none' | 'scale-down'} ObjectFit
 */

// Export empty object to make this a module
export {};
