/**
 * Skeleton Loading Components
 * 
 * A collection of skeleton loading placeholders for various UI elements.
 * Used to show loading states while content is being fetched.
 * 
 * @module Skeleton
 */

/**
 * Base skeleton component with pulse animation
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

/**
 * Skeleton for text lines
 * @param {Object} props - Component props
 * @param {number} props.lines - Number of text lines
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for card components
 * @param {Object} props - Component props
 * @param {boolean} props.hasImage - Whether the card has an image
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function CardSkeleton({ hasImage = true, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      {hasImage && <Skeleton className="h-48 w-full rounded-none" />}
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <TextSkeleton lines={2} />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

/**
 * Skeleton for event cards
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function EventCardSkeleton({ className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <TextSkeleton lines={2} />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton for news cards
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function NewsCardSkeleton({ className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-gray-200 dark:border-gray-600 ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-7 w-4/5 mb-3" />
      <div className="flex items-center gap-4 mb-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
      <TextSkeleton lines={2} />
      <Skeleton className="h-4 w-24 mt-4" />
    </div>
  );
}

/**
 * Skeleton for team member cards
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function TeamMemberSkeleton({ className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center ${className}`}>
      <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
  );
}

/**
 * Skeleton for form fields
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function FormFieldSkeleton({ className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

/**
 * Skeleton for page header
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export function PageHeaderSkeleton({ className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <Skeleton className="h-10 w-64 mx-auto mb-4" />
      <Skeleton className="h-5 w-96 mx-auto" />
    </div>
  );
}

/**
 * Grid of skeleton cards
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeleton cards
 * @param {string} props.type - Type of skeleton ('card', 'event', 'news', 'team')
 * @param {string} props.className - Additional CSS classes for grid
 * @returns {JSX.Element}
 */
export function SkeletonGrid({ count = 4, type = 'card', className = '' }) {
  const SkeletonComponent = {
    card: CardSkeleton,
    event: EventCardSkeleton,
    news: NewsCardSkeleton,
    team: TeamMemberSkeleton,
  }[type] || CardSkeleton;

  return (
    <div className={`grid gap-6 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

export default Skeleton;
