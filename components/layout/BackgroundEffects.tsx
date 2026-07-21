'use client';

/**
 * ===========================================
 * BACKGROUND EFFECTS — light default (Phase 0)
 * ===========================================
 */

import { cn } from '@/lib/utils';

interface BackgroundEffectsProps {
    className?: string;
}

export function BackgroundEffects({ className }: BackgroundEffectsProps) {
    return (
        <div
            className={cn(
                'fixed inset-0 -z-10 overflow-hidden pointer-events-none',
                className
            )}
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-[var(--background)]" />

            {/* Soft light atmosphere */}
            <div className="absolute top-[-10%] left-[10%] h-[520px] w-[520px] rounded-full bg-[var(--card)] opacity-70 blur-[120px]" />
            <div className="absolute top-[30%] right-[-5%] h-[420px] w-[420px] rounded-full bg-[var(--card)] opacity-50 blur-[100px]" />
            <div className="absolute bottom-[-5%] left-[35%] h-[480px] w-[480px] rounded-full bg-[var(--card)] opacity-40 blur-[130px]" />

            {/* Very subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                                      linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px',
                }}
            />
        </div>
    );
}

export type { BackgroundEffectsProps };
