'use client';

/**
 * Google Play CTA — shadcn Button-inspired (outline/default) with brand logo.
 * @see https://ui.shadcn.com/docs/components/button
 */

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PlayStoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    size?: 'sm' | 'default';
}

function GooglePlayBrandIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M1.5 1.6c-.3.3-.5.8-.5 1.4v17.9c0 .6.2 1.1.5 1.4l.1.1 10-10.1v-.3L1.6 1.5l-.1.1z"
                fill="#00D2FF"
            />
            <path
                d="M14.1 14.1l-2.6-2.6-.1 3.1 2.7 2.7 3.1-1.7c.9-.5.9-1.8 0-2.3l-3.1-1.2z"
                fill="#FFCE00"
            />
            <path
                d="M11.4 11.4L1.6 21.2c.4.4 1 .6 1.6.4l10.2-5.9-1.9-1.9-.1.6z"
                fill="#FF3A44"
            />
            <path
                d="M11.4 12.6l1.9-1.9L3.2 2.4c-.6-.2-1.2 0-1.6.4l9.8 9.8z"
                fill="#00F076"
            />
        </svg>
    );
}

export const PlayStoreButton = forwardRef<HTMLButtonElement, PlayStoreButtonProps>(
    ({ label = 'Google Play', size = 'default', className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'inline-flex w-auto items-center justify-center gap-2.5 whitespace-nowrap',
                    'rounded-md text-sm font-medium',
                    'border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]',
                    'shadow-sm',
                    'transition-colors',
                    'hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
                    'disabled:pointer-events-none disabled:opacity-50',
                    size === 'sm' ? 'h-9 px-3' : 'h-10 px-4',
                    className
                )}
                {...props}
            >
                <GooglePlayBrandIcon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
            </button>
        );
    }
);

PlayStoreButton.displayName = 'PlayStoreButton';

export { GooglePlayBrandIcon };