'use client';

/**
 * ===========================================
 * EXPERIENCE SECTION WRAPPER
 * ===========================================
 * Backward-compatible wrapper for the split education and work sections.
 */

import { cn } from '@/lib/utils';
import { EducationSection } from './EducationSection';
import { WorkExperienceSection } from './WorkExperienceSection';

interface ExperienceSectionProps {
    className?: string;
}

export function ExperienceSection({ className }: ExperienceSectionProps) {
    return (
        <div className={cn(className)}>
            <EducationSection />
            <WorkExperienceSection />
        </div>
    );
}

export type { ExperienceSectionProps };
