/**
 * ===========================================
 * BUTTON COMPONENT
 * ===========================================
 * A versatile button component with multiple variants,
 * sizes, and states following the Design System.
 *
 * @example
 * // Primary button (default)
 * <Button>Click Me</Button>
 *
 * // Secondary outline button
 * <Button variant="outline" size="lg">Learn More</Button>
 *
 * // Loading state
 * <Button isLoading>Submitting...</Button>
 *
 * // With icon
 * <Button leftIcon={<IconName />}>With Icon</Button>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

/**
 * Button variants - defines the visual style
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button sizes - defines the dimensions
 */
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

/**
 * Button props interface extending native button attributes
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button visual variant */
    variant?: ButtonVariant;
    /** Button size */
    size?: ButtonSize;
    /** Show loading spinner and disable interaction */
    isLoading?: boolean;
    /** Make button full width */
    fullWidth?: boolean;
    /** Icon to show on the left side */
    leftIcon?: ReactNode;
    /** Icon to show on the right side */
    rightIcon?: ReactNode;
    /** Button content */
    children?: ReactNode;
}

// ============================================
// STYLE MAPPINGS
// ============================================

/**
 * Variant styles - each variant has its own visual style
 * Uses CSS variables from Design System for theming support
 */
const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-[var(--primary)] 
    text-[var(--primary-foreground)] 
    hover:bg-[var(--primary-hover)] 
    focus-visible:ring-[var(--primary)]
  `,
    secondary: `
    bg-[var(--background-tertiary)] 
    text-[var(--foreground)] 
    hover:bg-[var(--border)] 
    focus-visible:ring-[var(--border)]
  `,
    outline: `
    border-2 
    border-[var(--primary)] 
    text-[var(--primary)] 
    bg-transparent 
    hover:bg-[var(--primary)] 
    hover:text-[var(--primary-foreground)]
    focus-visible:ring-[var(--primary)]
  `,
    ghost: `
    bg-transparent 
    text-[var(--foreground)] 
    hover:bg-[var(--background-tertiary)]
    focus-visible:ring-[var(--border)]
  `,
    danger: `
    bg-[var(--color-error)] 
    text-white 
    hover:bg-red-600
    focus-visible:ring-[var(--color-error)]
  `,
};

/**
 * Size styles - dimensions for each size
 */
const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-sm gap-1.5',
    md: 'h-11 px-6 text-base gap-2',
    lg: 'h-14 px-8 text-lg gap-2.5',
    icon: 'h-11 w-11 p-0', // Square button for icons only
};

// ============================================
// COMPONENT
// ============================================

/**
 * Button component
 *
 * A flexible button component that supports:
 * - Multiple visual variants (primary, secondary, outline, ghost, danger)
 * - Multiple sizes (sm, md, lg, icon)
 * - Loading state with spinner
 * - Left and right icons
 * - Full width option
 * - All native button attributes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            children,
            className,
            disabled,
            type = 'button',
            ...props
        },
        ref
    ) => {
        // Base styles applied to all buttons
        const baseStyles = `
      inline-flex 
      items-center 
      justify-center 
      font-medium 
      rounded-[var(--radius-base)]
      transition-all 
      duration-[var(--transition-base)]
      focus-visible:outline-none 
      focus-visible:ring-2 
      focus-visible:ring-offset-2
      focus-visible:ring-offset-[var(--background)]
      disabled:opacity-50 
      disabled:pointer-events-none
      select-none
    `;

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {/* Loading spinner */}
                {isLoading && (
                    <LoadingSpinner className={children ? 'mr-2' : ''} />
                )}

                {/* Left icon */}
                {!isLoading && leftIcon && (
                    <span className="inline-flex shrink-0">{leftIcon}</span>
                )}

                {/* Button text/children */}
                {children}

                {/* Right icon */}
                {!isLoading && rightIcon && (
                    <span className="inline-flex shrink-0">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Loading spinner component
 * Shown when button is in loading state
 */
function LoadingSpinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn('animate-spin h-5 w-5', className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
    );
}

// ============================================
// EXPORTS
// ============================================

export type { ButtonProps, ButtonVariant, ButtonSize };
