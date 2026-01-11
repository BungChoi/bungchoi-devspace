'use client';

/**
 * ===========================================
 * SKILLS SECTION - ABOUT PAGE
 * ===========================================
 * Displays skills grouped by category with level indicators.
 */

import { cn } from '@/lib/utils';
import { skills, skillCategoryLabels } from '@/lib/data';
import type { SkillCategory, Skill } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface SkillsSectionProps {
    className?: string;
}

// ============================================
// CONSTANTS
// ============================================

const CATEGORY_ORDER: SkillCategory[] = ['mobile', 'frontend', 'backend', 'database', 'tools'];

const LEVEL_COLORS: Record<string, string> = {
    expert: 'bg-emerald-500',
    advanced: 'bg-[var(--primary)]',
    intermediate: 'bg-amber-500',
    beginner: 'bg-gray-400',
};

const LEVEL_WIDTH: Record<string, string> = {
    expert: 'w-full',
    advanced: 'w-3/4',
    intermediate: 'w-1/2',
    beginner: 'w-1/4',
};

// ============================================
// COMPONENT
// ============================================

export function SkillsSection({ className }: SkillsSectionProps) {
    // Group skills by category
    const groupedSkills = CATEGORY_ORDER.reduce((acc, category) => {
        acc[category] = skills.filter((s) => s.category === category);
        return acc;
    }, {} as Record<SkillCategory, Skill[]>);

    return (
        <section className={cn('py-20 sm:py-28', className)}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        What I Do
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Skills & <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Technologies and tools I use to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORY_ORDER.map((category) => (
                        <SkillCard
                            key={category}
                            category={category}
                            label={skillCategoryLabels[category]}
                            skills={groupedSkills[category]}
                        />
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-[var(--foreground-muted)]">
                    {Object.entries(LEVEL_COLORS).map(([level, color]) => (
                        <div key={level} className="flex items-center gap-2">
                            <div className={cn('w-3 h-3 rounded-full', color)} />
                            <span className="capitalize">{level}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SKILL CARD
// ============================================

interface SkillCardProps {
    category: SkillCategory;
    label: string;
    skills: Skill[];
}

function SkillCard({ label, skills }: SkillCardProps) {
    if (skills.length === 0) return null;

    return (
        <div
            className={cn(
                'p-6 rounded-xl',
                'bg-[var(--background)]/40 backdrop-blur-sm',
                'border border-[var(--primary)]/20',
                'hover:border-[var(--primary)]/40 transition-colors'
            )}
        >
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">{label}</h3>
            <div className="space-y-3">
                {skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                ))}
            </div>
        </div>
    );
}

// ============================================
// SKILL ITEM
// ============================================

function SkillItem({ skill }: { skill: Skill }) {
    const level = skill.level || 'beginner';

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--foreground)]">{skill.name}</span>
                <span className="text-xs text-[var(--foreground-muted)] capitalize">{level}</span>
            </div>
            <div className="h-1.5 bg-[var(--foreground)]/10 rounded-full overflow-hidden">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-500',
                        LEVEL_COLORS[level],
                        LEVEL_WIDTH[level]
                    )}
                />
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { SkillsSectionProps };
