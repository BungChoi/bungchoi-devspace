'use client';

/**
 * ===========================================
 * HERO SECTION COMPONENT - SIMPLIFIED
 * ===========================================
 * Minimalist landing section with portfolio title.
 */

import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import { TechMarquee } from './TechMarquee';

// ============================================
// TYPES
// ============================================

interface HeroProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function Hero({ className }: HeroProps) {
    const { name, title } = personalInfo;

    return (
        <section
            id="home"
            className={cn(
                'relative min-h-screen flex flex-col justify-center overflow-hidden',
                'py-20 px-4',
                className
            )}
        >
            {/* Enhanced Background */}
            <HeroBackground />

            {/* Content Container */}
            <div className="container max-w-5xl mx-auto relative z-10 flex-1 flex items-center">
                <div className="text-center w-full">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                        </span>
                        Available for projects
                    </div>

                    {/* Main Heading - Portfolio (Largest with Playfair font) */}
                    <h1
                        className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold tracking-tight mb-6"
                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                        <span className="text-gradient">Portfolio</span>
                    </h1>

                    {/* Name (with Space Grotesk font) */}
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)] mb-4"
                        style={{ fontFamily: 'var(--font-space), sans-serif' }}
                    >
                        {name}
                    </h2>

                    {/* Title - Mobile Developer only */}
                    <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] font-medium">
                        {title}
                    </p>
                </div>
            </div>

            {/* Tech Stack Marquee at bottom */}
            <TechMarquee />
        </section>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Enhanced animated background with gradient mesh
 */
function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[var(--background)]" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary)] opacity-15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--accent)] opacity-10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-primary-600)] opacity-5 rounded-full blur-[100px]" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                                      linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Radial gradient for vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { HeroProps };
