/**
 * ===========================================
 * BADGE COMPONENT
 * ===========================================
 * A small label component for categorization,
 * status indication, or highlighting information.
 *
 * @example
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Colored variants
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Expired</Badge>
 *
 * // With dot indicator
 * <Badge variant="success" dot>Online</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 *
 * // As skill tag
 * <Badge variant="outline">Flutter</Badge>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

/**
 * Badge variants - defines the visual style
 */
type BadgeVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

/**
 * Badge sizes
 */
type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge props interface
 */
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Badge visual variant */
    variant?: BadgeVariant;
    /** Badge size */
    size?: BadgeSize;
    /** Show a colored dot indicator */
    dot?: boolean;
    /** Make badge pill-shaped (fully rounded) */
    pill?: boolean;
    /** Badge content */
    children?: ReactNode;
}

// ============================================
// STYLE MAPPINGS
// ============================================

/**
 * Variant styles
 */
const variantStyles: Record<BadgeVariant, string> = {
    default: `
    bg-[var(--background-tertiary)] 
    text-[var(--foreground)]
    border-[var(--border)]
  `,
    primary: `
    bg-[var(--color-primary-100)] 
    text-[var(--color-primary-700)]
    border-[var(--color-primary-200)]
    dark:bg-[var(--color-primary-950)]
    dark:text-[var(--color-primary-300)]
    dark:border-[var(--color-primary-800)]
  `,
    secondary: `
    bg-[var(--background-tertiary)] 
    text-[var(--foreground-secondary)]
    border-[var(--border)]
  `,
    outline: `
    bg-transparent 
    text-[var(--foreground)]
    border-[var(--border)]
    hover:bg-[var(--background-tertiary)]
  `,
    success: `
    bg-green-100 
    text-green-700
    border-green-200
    dark:bg-green-950
    dark:text-green-300
    dark:border-green-800
  `,
    warning: `
    bg-amber-100 
    text-amber-700
    border-amber-200
    dark:bg-amber-950
    dark:text-amber-300
    dark:border-amber-800
  `,
    danger: `
    bg-red-100 
    text-red-700
    border-red-200
    dark:bg-red-950
    dark:text-red-300
    dark:border-red-800
  `,
    info: `
    bg-blue-100 
    text-blue-700
    border-blue-200
    dark:bg-blue-950
    dark:text-blue-300
    dark:border-blue-800
  `,
};

/**
 * Size styles
 */
const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
};

/**
 * Dot color by variant
 */
const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-[var(--foreground-muted)]',
    primary: 'bg-[var(--primary)]',
    secondary: 'bg-[var(--foreground-secondary)]',
    outline: 'bg-[var(--foreground)]',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
};

// ============================================
// COMPONENT
// ============================================

/**
 * Badge component
 *
 * A small label for displaying status, categories,
 * or highlighting information. Commonly used for:
 * - Skill tags
 * - Status indicators
 * - Category labels
 * - Notification counts
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            variant = 'default',
            size = 'md',
            dot = false,
            pill = true,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex 
      items-center 
      gap-1.5
      font-medium 
      border
      whitespace-nowrap
      transition-colors
      duration-[var(--transition-fast)]
    `;

        const radiusStyle = pill
            ? 'rounded-full'
            : 'rounded-[var(--radius-sm)]';

        return (
            <span
                ref={ref}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    radiusStyle,
                    className
                )}
                {...props}
            >
                {/* Dot indicator */}
                {dot && (
                    <span
                        className={cn(
                            'h-1.5 w-1.5 rounded-full shrink-0',
                            dotColors[variant]
                        )}
                        aria-hidden="true"
                    />
                )}

                {/* Badge content */}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

// ============================================
// BADGE GROUP COMPONENT
// ============================================

/**
 * BadgeGroup - Container for multiple badges
 */
interface BadgeGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Gap between badges */
    gap?: 'sm' | 'md' | 'lg';
    children?: ReactNode;
}

const gapStyles = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
};

const BadgeGroup = forwardRef<HTMLDivElement, BadgeGroupProps>(
    ({ gap = 'md', className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex flex-wrap', gapStyles[gap], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

BadgeGroup.displayName = 'BadgeGroup';

// ============================================
// EXPORTS
// ============================================

export { Badge, BadgeGroup };
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeGroupProps };
