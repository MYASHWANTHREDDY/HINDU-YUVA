/**
 * Form validation rules and messages
 */
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^[\d\s\-()+ ]+$/,
    message: 'Please enter a valid phone number',
  },
  url: {
    pattern: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_~.#?&//=]*)$/,
    message: 'Please enter a valid URL',
  },
  required: {
    message: 'This field is required',
  },
  minLength: (length) => ({
    message: `Minimum length is ${length} characters`,
  }),
  maxLength: (length) => ({
    message: `Maximum length is ${length} characters`,
  }),
};

/**
 * Common error messages
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  SERVER_ERROR: 'An error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
};

export default VALIDATION;
