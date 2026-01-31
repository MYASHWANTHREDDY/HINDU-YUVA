/**
 * Card Component
 *
 * A flexible card component for displaying content in a contained box.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Whether card has hover effect
 * @param {boolean} props.bordered - Whether card has border
 * @param {string} props.padding - Padding size ('none', 'sm', 'md', 'lg')
 * @param {Function} props.onClick - Click handler (makes card clickable)
 * @returns {JSX.Element}
 *
 * @example
 * <Card hoverable padding="lg">
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content here</Card.Body>
 *   <Card.Footer>Footer actions</Card.Footer>
 * </Card>
 */
function Card({
  children,
  className = '',
  hoverable = false,
  bordered = false,
  padding = 'md',
  onClick,
  ...props
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md
        ${hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}
        ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card Header Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

/**
 * Card Title Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Title content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
Card.Title = function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-xl font-bold text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </h3>
  );
};

/**
 * Card Body Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Body content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`text-gray-700 dark:text-gray-300 ${className}`}>{children}</div>;
};

/**
 * Card Footer Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Image Component
 * @param {Object} props - Component props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Alt text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
Card.Image = function CardImage({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4 ${className}`}
      style={{ width: 'calc(100% + 3rem)' }}
    />
  );
};

export default Card;
