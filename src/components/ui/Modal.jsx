/**
 * Modal Component
 * 
 * A reusable modal/dialog component with various features.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.title - Modal title
 * @param {string} props.size - Modal size ('sm', 'md', 'lg', 'xl', 'full')
 * @param {boolean} props.showCloseButton - Whether to show close button
 * @param {boolean} props.closeOnOverlayClick - Close when clicking overlay
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element|null}
 * 
 * @example
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 */
function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
}) {
  // Don't render if not open
  if (!isOpen) return null;

  // Size classes
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'max-w-full mx-4',
  };

  /**
   * Handle overlay click
   * @param {React.MouseEvent} e - Click event
   */
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Handle escape key press
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Add event listener for escape key
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full
          ${sizes[size]}
          max-h-[90vh] overflow-hidden flex flex-col
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-bold text-gray-900 dark:text-gray-100"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold transition"
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Modal Footer Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
Modal.Footer = function ModalFooter({ children, className = '' }) {
  return (
    <div className={`flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export default Modal;
