/**
 * ===========================================
 * CARD COMPONENT
 * ===========================================
 * A flexible card component for displaying content
 * in a contained, elevated surface.
 *
 * @example
 * // Basic card
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 *
 * // Simple card without sub-components
 * <Card className="p-6">
 *   <h3>Simple Card</h3>
 *   <p>Content</p>
 * </Card>
 *
 * // Hoverable card
 * <Card hoverable>Hover me!</Card>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

/**
 * Card variants - defines the visual style
 */
type CardVariant = 'default' | 'outline' | 'ghost' | 'elevated';

/**
 * Base card props
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Card visual variant */
    variant?: CardVariant;
    /** Enable hover effects */
    hoverable?: boolean;
    /** Card content */
    children?: ReactNode;
}

/**
 * Card section props (header, content, footer)
 */
interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

/**
 * Card title props
 */
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Title text */
    children?: ReactNode;
    /** HTML heading level */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Card description props
 */
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
}

// ============================================
// STYLE MAPPINGS
// ============================================

/**
 * Variant styles for card
 */
const variantStyles: Record<CardVariant, string> = {
    default: `
    bg-[var(--card)] 
    border 
    border-[var(--border)]
  `,
    outline: `
    bg-transparent 
    border-2 
    border-[var(--border)]
  `,
    ghost: `
    bg-transparent 
    border-none
  `,
    elevated: `
    bg-[var(--card)] 
    border 
    border-[var(--border)] 
    shadow-[var(--shadow-md)]
  `,
};

// ============================================
// MAIN CARD COMPONENT
// ============================================

/**
 * Card component
 *
 * A container component for grouping related content.
 * Can be used with sub-components (CardHeader, CardContent, CardFooter)
 * or as a simple container.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        { variant = 'default', hoverable = false, className, children, ...props },
        ref
    ) => {
        const baseStyles = `
      rounded-[var(--radius-md)]
      text-[var(--card-foreground)]
      transition-all
      duration-[var(--transition-base)]
    `;

        const hoverStyles = hoverable
            ? `
        hover:border-[var(--border-hover)]
        hover:shadow-[var(--shadow-lg)]
        hover:-translate-y-1
        cursor-pointer
      `
            : '';

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// ============================================
// CARD SUB-COMPONENTS
// ============================================

/**
 * CardHeader - Container for card title and description
 */
const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex flex-col space-y-1.5 p-6', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Card heading
 */
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ as: Component = 'h3', className, children, ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(
                    'text-xl font-semibold leading-none tracking-tight text-[var(--foreground)]',
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Supporting text below title
 */
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={cn('text-sm text-[var(--foreground-secondary)]', className)}
                {...props}
            >
                {children}
            </p>
        );
    }
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area
 */
const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
                {children}
            </div>
        );
    }
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer area for actions
 */
const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex items-center p-6 pt-0', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooter.displayName = 'CardFooter';

/**
 * CardImage - Image container with proper aspect ratio
 */
interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
    /** Image source URL */
    src: string;
    /** Image alt text */
    alt: string;
    /** Aspect ratio class */
    aspectRatio?: 'video' | 'square' | 'wide';
}

const aspectRatioStyles = {
    video: 'aspect-video', // 16:9
    square: 'aspect-square', // 1:1
    wide: 'aspect-[2/1]', // 2:1
};

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
    ({ src, alt, aspectRatio = 'video', className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'relative overflow-hidden rounded-t-[var(--radius-md)]',
                    aspectRatioStyles[aspectRatio],
                    className
                )}
                {...props}
            >
                <img
                    src={src}
                    alt={alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
        );
    }
);

CardImage.displayName = 'CardImage';

// ============================================
// EXPORTS
// ============================================

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardImage,
};

export type { CardProps, CardVariant, CardSectionProps, CardTitleProps };
