/**
 * Button Component
 * 
 * A reusable button component with various variants and sizes.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant ('primary', 'secondary', 'outline', 'ghost', 'danger')
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {boolean} props.fullWidth - Whether button takes full width
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type ('button', 'submit', 'reset')
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element}
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  // Variant styles
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 dark:bg-orange-500 dark:hover:bg-orange-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-gray-800',
    ghost: 'text-orange-600 hover:bg-orange-50 focus:ring-orange-500 dark:text-orange-400 dark:hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
