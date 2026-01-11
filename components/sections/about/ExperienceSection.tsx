'use client';

/**
 * ===========================================
 * EXPERIENCE SECTION - ABOUT PAGE
 * ===========================================
 * Work and education timeline with achievements.
 */

import { cn } from '@/lib/utils';
import { experiences, educations } from '@/lib/data';

// ============================================
// TYPES
// ============================================

interface ExperienceSectionProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function ExperienceSection({ className }: ExperienceSectionProps) {
    return (
        <section className={cn('py-20 sm:py-28', className)}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        My Journey
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        Experience & <span className="text-gradient">Education</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Work Experience */}
                    <div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            Work Experience
                        </h3>
                        <Timeline items={experiences} type="work" />
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </span>
                            Education
                        </h3>
                        <Timeline items={educations} type="education" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// TIMELINE COMPONENT
// ============================================

interface TimelineItem {
    id: string;
    company?: string;
    institution?: string;
    position?: string;
    degree?: string;
    field?: string;
    startDate: string;
    endDate?: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
    gpa?: string;
}

interface TimelineProps {
    items: TimelineItem[];
    type: 'work' | 'education';
}

function Timeline({ items, type }: TimelineProps) {
    return (
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-[var(--primary)]/20" />

            <div className="space-y-8">
                {items.map((item, index) => (
                    <TimelineCard key={item.id} item={item} type={type} isFirst={index === 0} />
                ))}
            </div>
        </div>
    );
}

// ============================================
// TIMELINE CARD
// ============================================

interface TimelineCardProps {
    item: TimelineItem;
    type: 'work' | 'education';
    isFirst: boolean;
}

function TimelineCard({ item, type, isFirst }: TimelineCardProps) {
    const title = type === 'work' ? item.position : `${item.degree} in ${item.field}`;
    const subtitle = type === 'work' ? item.company : item.institution;
    const period = item.endDate ? `${item.startDate} - ${item.endDate}` : `${item.startDate} - Present`;

    return (
        <div className="relative pl-10">
            {/* Dot */}
            <div
                className={cn(
                    'absolute left-0 w-7 h-7 rounded-full flex items-center justify-center',
                    'border-2',
                    isFirst
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                        : 'bg-[var(--background)] border-[var(--primary)]/40'
                )}
            >
                {isFirst && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                )}
            </div>

            {/* Card */}
            <div
                className={cn(
                    'p-5 rounded-xl',
                    'bg-[var(--background)]/40 backdrop-blur-sm',
                    'border border-[var(--primary)]/20',
                    'hover:border-[var(--primary)]/40 transition-colors'
                )}
            >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                        <h4 className="font-bold text-[var(--foreground)]">{title}</h4>
                        <p className="text-[var(--primary)] text-sm">{subtitle}</p>
                    </div>
                    <span className="text-xs text-[var(--foreground-muted)] bg-[var(--foreground)]/5 px-2 py-1 rounded">
                        {period}
                    </span>
                </div>

                {/* Description */}
                {item.description && (
                    <p className="text-sm text-[var(--foreground-secondary)] mb-3">
                        {item.description}
                    </p>
                )}

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                    <ul className="text-sm text-[var(--foreground-secondary)] space-y-1 mb-3">
                        {item.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-[var(--primary)] mt-1">•</span>
                                {achievement}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Technologies (Work) */}
                {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {item.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* GPA (Education) */}
                {item.gpa && (
                    <p className="text-sm text-[var(--foreground-muted)] mt-2">
                        GPA: <span className="text-[var(--primary)] font-medium">{item.gpa}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { ExperienceSectionProps };
