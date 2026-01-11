'use client';

/**
 * ===========================================
 * SKILLS SECTION COMPONENT
 * ===========================================
 * Displays technical skills grouped by category
 * with visual skill level indicators.
 */

import { skills, skillCategoryLabels, getSkillsByCategory } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { SkillCategory, Skill } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface SkillsProps {
    className?: string;
}

// ============================================
// CONSTANTS
// ============================================

const categoryOrder: SkillCategory[] = ['mobile', 'frontend', 'backend', 'database', 'tools'];

const categoryIcons: Record<SkillCategory, string> = {
    mobile: '📱',
    frontend: '🎨',
    backend: '⚙️',
    database: '🗄️',
    tools: '🛠️',
    other: '📦',
};

const levelColors: Record<string, string> = {
    beginner: 'bg-yellow-500',
    intermediate: 'bg-blue-500',
    advanced: 'bg-purple-500',
    expert: 'bg-[var(--primary)]',
};

const levelWidths: Record<string, string> = {
    beginner: 'w-1/4',
    intermediate: 'w-2/4',
    advanced: 'w-3/4',
    expert: 'w-full',
};

// ============================================
// COMPONENT
// ============================================

export function Skills({ className }: SkillsProps) {
    return (
        <section
            id="skills"
            className={cn(
                'relative py-20 sm:py-28',
                className
            )}
        >
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        Tech Stack
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Skills & <span className="text-gradient">Expertise</span>
                    </h2>
                    <p className="text-[var(--foreground-secondary)] mt-4 max-w-2xl mx-auto">
                        Teknologi dan tools yang saya gunakan untuk membangun aplikasi mobile dan web yang modern.
                    </p>
                </div>

                {/* Skills Grid by Category */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryOrder.map((category) => {
                        const categorySkills = getSkillsByCategory(category);
                        if (categorySkills.length === 0) return null;

                        return (
                            <SkillCard
                                key={category}
                                category={category}
                                skills={categorySkills}
                            />
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                        <span className="text-[var(--foreground-secondary)]">Expert</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-[var(--foreground-secondary)]">Advanced</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-[var(--foreground-secondary)]">Intermediate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-[var(--foreground-secondary)]">Beginner</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface SkillCardProps {
    category: SkillCategory;
    skills: Skill[];
}

function SkillCard({ category, skills }: SkillCardProps) {
    return (
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-300 group">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{categoryIcons[category]}</span>
                <h3 className="font-semibold text-lg">
                    {skillCategoryLabels[category]}
                </h3>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-[var(--foreground-muted)] capitalize">
                                {skill.level}
                            </span>
                        </div>
                        {/* Skill Level Bar */}
                        <div className="h-1.5 bg-[var(--background-tertiary)] rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    'h-full rounded-full transition-all duration-500',
                                    levelColors[skill.level || 'beginner'],
                                    levelWidths[skill.level || 'beginner'],
                                    'group-hover:opacity-100 opacity-80'
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { SkillsProps };
