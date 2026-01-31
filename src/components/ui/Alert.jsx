/**
 * Alert Component
 *
 * A component for displaying important messages or notifications.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Alert content
 * @param {string} props.variant - Alert variant ('info', 'success', 'warning', 'error')
 * @param {string} props.title - Alert title (optional)
 * @param {boolean} props.dismissible - Whether alert can be dismissed
 * @param {Function} props.onDismiss - Dismiss handler
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 *
 * @example
 * <Alert variant="success" title="Success!">
 *   Your form has been submitted successfully.
 * </Alert>
 */
function Alert({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) {
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-500',
      text: 'text-blue-800 dark:text-blue-300',
      icon: 'ℹ️',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-500',
      text: 'text-green-800 dark:text-green-300',
      icon: '✓',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-500',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-500',
      text: 'text-red-800 dark:text-red-300',
      icon: '✕',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`
        ${style.bg} ${style.text}
        border-l-4 ${style.border}
        p-4 rounded-r-lg
        ${className}
      `}
      role="alert"
      {...props}
    >
      <div className="flex items-start">
        <span className="mr-3 text-lg">{style.icon}</span>
        <div className="flex-1">
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          <div>{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={`ml-4 ${style.text} hover:opacity-70 text-xl font-bold`}
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
