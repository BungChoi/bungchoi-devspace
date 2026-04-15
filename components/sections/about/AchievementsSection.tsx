'use client';

/**
 * ===========================================
 * ACHIEVEMENTS SECTION - ABOUT PAGE
 * ===========================================
 * Academic awards, certifications, and achievements.
 * Data imported from lib/data/achievements.ts
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { achievements } from '@/lib/data';
import type { Achievement, Locale } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface AchievementsSectionProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function AchievementsSection({ className }: AchievementsSectionProps) {
    const t = useTranslations('sections');
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;

        if (!element) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const timeout = window.setTimeout(() => setIsVisible(true), 0);

            return () => window.clearTimeout(timeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -16% 0px', threshold: 0.18 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className={cn(
                'achievements-section scroll-mt-24 py-20 sm:py-28',
                isVisible && 'is-visible',
                className
            )}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
                {/* Section Header */}
                <div
                    className="achievement-reveal text-center mb-12"
                    style={{ '--achievement-delay': '60ms' } as CSSProperties}
                >
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        {t('recognition')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        {t('awardsAndCertifications').split('&')[0]} & <span className="text-gradient">{t('awardsAndCertifications').split('&')[1]?.trim() || 'Certifications'}</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-secondary)] max-w-xl mx-auto">
                        {t('awardsDesc')}
                    </p>
                </div>

                {/* Achievements List */}
                <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className="achievement-reveal"
                            style={{ '--achievement-delay': `${180 + index * 120}ms` } as CSSProperties}
                        >
                            <AchievementItem
                                achievement={achievement}
                                index={index}
                                locale={locale}
                                viewCertificateLabel={tCommon('viewCertificate')}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .achievement-reveal {
                    opacity: 0;
                    transform: translateY(18px);
                    filter: blur(6px);
                    transition:
                        opacity 820ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 820ms cubic-bezier(0.16, 1, 0.3, 1),
                        filter 820ms cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: var(--achievement-delay, 0ms);
                    will-change: opacity, transform, filter;
                }

                .is-visible .achievement-reveal {
                    opacity: 1;
                    transform: translateY(0);
                    filter: blur(0);
                }

                @media (prefers-reduced-motion: reduce) {
                    .achievement-reveal {
                        opacity: 1;
                        transform: none;
                        filter: none;
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}

// ============================================
// ACHIEVEMENT ITEM
// ============================================

interface AchievementItemProps {
    achievement: Achievement;
    index: number;
    locale: Locale;
    viewCertificateLabel: string;
}

function AchievementItem({ achievement, index, locale, viewCertificateLabel }: AchievementItemProps) {
    return (
        <div
            className={cn(
                'group flex flex-col sm:flex-row sm:items-center justify-between gap-4',
                'p-5 sm:p-6 rounded-xl',
                'bg-[var(--background)]/40 backdrop-blur-sm',
                'border border-[var(--primary)]/20',
                'hover:border-[var(--primary)]/40 transition-all duration-300'
            )}
        >
            {/* Left: Content */}
            <div className="flex-1">
                <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className="hidden sm:flex w-8 h-8 rounded-full bg-[var(--primary)]/10 items-center justify-center text-[var(--primary)] font-bold text-sm flex-shrink-0">
                        {index + 1}
                    </div>

                    <div className="flex-1">
                        {/* Title & Date */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                {achievement.title[locale]}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--foreground)]/10 text-[var(--foreground-muted)]">
                                {achievement.date[locale]}
                            </span>
                        </div>

                        {/* Issuer */}
                        <p className="text-sm text-[var(--primary)] mb-2">
                            {achievement.issuer[locale]}
                        </p>

                        {/* Description */}
                        {achievement.description && (
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                {achievement.description[locale]}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Certificate Button */}
            {achievement.certificateUrl && (
                <a
                    href={achievement.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        'inline-flex items-center gap-2 self-start sm:self-center',
                        'px-4 py-2 rounded-full text-sm font-medium',
                        'bg-[var(--primary)]/10 text-[var(--primary)]',
                        'border border-[var(--primary)]/20',
                        'hover:bg-[var(--primary)]/20 hover:border-[var(--primary)]/40',
                        'transition-all duration-300'
                    )}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {viewCertificateLabel}
                </a>
            )}
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { AchievementsSectionProps };
