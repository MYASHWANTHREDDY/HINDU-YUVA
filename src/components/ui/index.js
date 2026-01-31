/**
 * UI Components Library
 *
 * A collection of reusable UI components for the Hindu YUVA website.
 * Import components from this file for cleaner imports.
 *
 * @module ui
 *
 * @example
 * import { Button, Card, Modal, Input, Badge, Alert } from '@/components/ui';
 */

export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Modal } from './Modal';
export { default as Input, Textarea, Select } from './Input';
export { default as Badge } from './Badge';
export { default as Alert } from './Alert';
export { default as OptimizedImage, AvatarImage, BannerImage } from './OptimizedImage';
export {
  Skeleton,
  TextSkeleton,
  CardSkeleton,
  EventCardSkeleton,
  NewsCardSkeleton,
  TeamMemberSkeleton,
  FormFieldSkeleton,
  PageHeaderSkeleton,
  SkeletonGrid,
} from './Skeleton';
