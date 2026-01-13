'use client';

/**
 * ===========================================
 * ACHIEVEMENTS SECTION - ABOUT PAGE
 * ===========================================
 * Academic awards, certifications, and achievements.
 * Data imported from lib/data/achievements.ts
 */

import { cn } from '@/lib/utils';
import { achievements, type Achievement } from '@/lib/data';

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
    return (
        <section className={cn('py-20 sm:py-28', className)}>
            <div className="container max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        Recognition
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Awards & <span className="text-gradient">Certifications</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-secondary)] max-w-xl mx-auto">
                        Achievements and recognitions earned throughout my academic and professional journey.
                    </p>
                </div>

                {/* Achievements List */}
                <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                        <AchievementItem
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// ACHIEVEMENT ITEM
// ============================================

interface AchievementItemProps {
    achievement: Achievement;
    index: number;
}

function AchievementItem({ achievement, index }: AchievementItemProps) {
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
                                {achievement.title}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--foreground)]/10 text-[var(--foreground-muted)]">
                                {achievement.date}
                            </span>
                        </div>

                        {/* Issuer */}
                        <p className="text-sm text-[var(--primary)] mb-2">
                            {achievement.issuer}
                        </p>

                        {/* Description */}
                        {achievement.description && (
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                {achievement.description}
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
                    View Certificate
                </a>
            )}
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { AchievementsSectionProps };
