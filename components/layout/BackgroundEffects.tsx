'use client';

/**
 * ===========================================
 * BACKGROUND EFFECTS COMPONENT
 * ===========================================
 * Global animated gradient background that stays fixed
 * while content scrolls over it. Creates a seamless
 * visual experience across all sections.
 */

import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface BackgroundEffectsProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function BackgroundEffects({ className }: BackgroundEffectsProps) {
    return (
        <div
            className={cn(
                'fixed inset-0 -z-10 overflow-hidden pointer-events-none',
                className
            )}
            aria-hidden="true"
        >
            {/* Base background color */}
            <div className="absolute inset-0 bg-[var(--background)]" />

            {/* Animated gradient blobs - positioned at different locations */}

            {/* Top left - primary glow */}
            <div
                className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-[var(--primary)] opacity-15 rounded-full blur-[150px] animate-pulse"
                style={{ animationDuration: '4s' }}
            />

            {/* Top right - accent glow */}
            <div
                className="absolute top-[5%] right-[10%] w-[400px] h-[400px] bg-[var(--accent)] opacity-10 rounded-full blur-[120px] animate-pulse"
                style={{ animationDuration: '6s', animationDelay: '1s' }}
            />

            {/* Center - subtle primary */}
            <div
                className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-[var(--primary)] opacity-5 rounded-full blur-[180px] animate-pulse"
                style={{ animationDuration: '8s', animationDelay: '2s' }}
            />

            {/* Bottom left - accent glow */}
            <div
                className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] bg-[var(--accent)] opacity-10 rounded-full blur-[130px] animate-pulse"
                style={{ animationDuration: '5s', animationDelay: '0.5s' }}
            />

            {/* Bottom right - primary glow */}
            <div
                className="absolute bottom-[10%] right-[20%] w-[550px] h-[550px] bg-[var(--primary)] opacity-12 rounded-full blur-[140px] animate-pulse"
                style={{ animationDuration: '7s', animationDelay: '3s' }}
            />

            {/* Radial overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { BackgroundEffectsProps };
