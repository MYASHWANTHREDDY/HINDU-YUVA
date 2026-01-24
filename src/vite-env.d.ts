/// <reference types="vite/client" />

/**
 * Environment Variables Type Definitions
 * 
 * These types extend Vite's ImportMetaEnv to include
 * our custom environment variables.
 */
interface ImportMetaEnv {
  /** Google Analytics Measurement ID */
  readonly VITE_GA_MEASUREMENT_ID: string;
  
  /** Google Sheets API endpoint for join form */
  readonly VITE_GOOGLE_SHEETS_ENDPOINT: string;
  
  /** Contact form submission endpoint */
  readonly VITE_CONTACT_FORM_ENDPOINT: string;
  
  /** Site URL */
  readonly VITE_SITE_URL: string;
  
  /** Site name */
  readonly VITE_SITE_NAME: string;
  
  /** Instagram profile URL */
  readonly VITE_INSTAGRAM_URL: string;
  
  /** Facebook page URL */
  readonly VITE_FACEBOOK_URL: string;
  
  /** WhatsApp contact number */
  readonly VITE_WHATSAPP_NUMBER: string;
  
  /** Contact email address */
  readonly VITE_CONTACT_EMAIL: string;
  
  /** Contact phone number */
  readonly VITE_CONTACT_PHONE: string;
  
  /** Meeting location */
  readonly VITE_MEETING_LOCATION: string;
  
  /** Meeting day */
  readonly VITE_MEETING_DAY: string;
  
  /** Meeting time */
  readonly VITE_MEETING_TIME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
