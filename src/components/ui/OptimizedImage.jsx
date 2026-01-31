import { useState, useEffect, useRef } from 'react';

/**
 * Optimized Image Component
 *
 * Features:
 * - Lazy loading with Intersection Observer
 * - Loading skeleton/placeholder
 * - Error handling with fallback
 * - Blur-up effect on load
 * - Responsive sizing
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.fallback - Fallback image URL
 * @param {string} props.placeholder - Placeholder color or image
 * @param {boolean} props.lazy - Enable lazy loading
 * @param {string} props.objectFit - CSS object-fit value
 * @param {Function} props.onLoad - Callback when image loads
 * @param {Function} props.onError - Callback on error
 * @returns {JSX.Element}
 *
 * @example
 * <OptimizedImage
 *   src="/event-photo.jpg"
 *   alt="Diwali celebration at CSUF"
 *   className="w-full h-64"
 *   objectFit="cover"
 *   lazy
 * />
 */
function OptimizedImage({
  src,
  alt,
  className = '',
  fallback = '/placeholder-image.jpg',
  placeholder = 'bg-gray-200 dark:bg-gray-700',
  lazy = true,
  objectFit = 'cover',
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading slightly before entering viewport
        threshold: 0.1,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [lazy]);

  /**
   * Handle successful image load
   */
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  /**
   * Handle image load error
   */
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Determine the actual source to use
  const imageSrc = hasError ? fallback : src;

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 ${placeholder} animate-pulse flex items-center justify-center`}
        >
          {/* Loading icon */}
          <svg
            className="w-10 h-10 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
        />
      )}

      {/* Error state indicator (optional) */}
      {hasError && isLoaded && (
        <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Image unavailable
        </div>
      )}
    </div>
  );
}

/**
 * Avatar Image Component
 * Optimized for circular profile images
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text
 * @param {string} props.size - Size ('sm', 'md', 'lg', 'xl')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function AvatarImage({ src, alt, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full ${className}`}
      objectFit="cover"
      fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=ea580c&color=fff`}
    />
  );
}

/**
 * Banner Image Component
 * Optimized for hero/banner images
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Overlay content
 * @returns {JSX.Element}
 */
export function BannerImage({ src, alt, className = '', children }) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full"
        objectFit="cover"
        lazy={false} // Hero images should load immediately
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default OptimizedImage;
