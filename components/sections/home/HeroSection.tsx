'use client';

/**
 * ===========================================
 * HERO SECTION COMPONENT - WITH i18n
 * ===========================================
 * Minimalist landing section with portfolio title.
 */

import { useTranslations, useLocale } from 'next-intl';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import { TechMarqueeSection } from './TechMarqueeSection';
import type { Locale } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface HeroSectionProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function HeroSection({ className }: HeroSectionProps) {
    const t = useTranslations('hero');
    const locale = useLocale() as Locale;
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
                        {t('available')}
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
                        {title[locale]}
                    </p>
                </div>
            </div>

            {/* Tech Stack Marquee at bottom */}
            <TechMarqueeSection />
        </section>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Hero-specific background overlay (grid pattern only)
 * Gradient effects are now handled by global BackgroundEffects
 */
function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Grid pattern overlay - Hero specific */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                                      linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { HeroSectionProps };
