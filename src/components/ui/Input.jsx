/**
 * Input Component
 * 
 * A styled input field component with label and error states.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.name - Input name attribute
 * @param {string} props.type - Input type
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text below input
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether field is disabled
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 * 
 * @example
 * <Input
 *   label="Email"
 *   name="email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   required
 *   error={emailError}
 * />
 */
function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = `input-${name}`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 border rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600'
          }
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

/**
 * Textarea Component
 * 
 * @param {Object} props - Component props (same as Input)
 * @param {number} props.rows - Number of rows
 * @returns {JSX.Element}
 */
export function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  ...props
}) {
  const inputId = `textarea-${name}`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-4 py-2 border rounded-lg transition-colors resize-none
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600'
          }
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

/**
 * Select Component
 * 
 * @param {Object} props - Component props
 * @param {Array<{value: string, label: string}>} props.options - Select options
 * @returns {JSX.Element}
 */
export function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = `select-${name}`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 border rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600'
          }
        `}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

export default Input;
