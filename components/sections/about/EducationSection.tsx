'use client';

/**
 * ===========================================
 * EDUCATION SECTION
 * ===========================================
 * Education timeline section for the portfolio journey.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { educations } from '@/lib/data';
import type { Education, Locale } from '@/lib/types';

interface EducationSectionProps {
    className?: string;
}

export function EducationSection({ className }: EducationSectionProps) {
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
            id="experience"
            ref={sectionRef}
            className={cn(
                'timeline-section scroll-mt-24 py-20 sm:py-28',
                isVisible && 'is-visible',
                className
            )}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
                <div className="timeline-reveal text-center mb-16" style={{ '--timeline-delay': '60ms' } as CSSProperties}>
                    <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                        {locale === 'id' ? 'Pendidikan' : 'Education'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                        {locale === 'id' ? 'Riwayat' : 'Education'} <span className="text-gradient">{locale === 'id' ? 'Pendidikan' : 'Background'}</span>
                    </h2>
                </div>

                <div className="timeline-reveal mb-8 flex justify-center" style={{ '--timeline-delay': '160ms' } as CSSProperties}>
                    <h3 className="inline-flex items-center gap-3 text-xl font-bold text-[var(--foreground)]">
                        <span className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </span>
                        {locale === 'id' ? 'Pendidikan' : 'Education'}
                    </h3>
                </div>

                <div className="max-w-6xl mx-auto">
                    <EducationTimeline items={educations} locale={locale} />
                </div>
            </div>

            <style jsx>{`
                .timeline-reveal,
                :global(.timeline-item) {
                    opacity: 0;
                    transform: translate(var(--timeline-x, 0), 12px);
                    filter: blur(6px);
                    transition:
                        opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
                        filter 900ms cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 180ms ease;
                    transition-delay: var(--timeline-delay, 0ms);
                }

                :global(.timeline-item-left) {
                    --timeline-x: -16px;
                }

                :global(.timeline-item-right) {
                    --timeline-x: 16px;
                }

                :global(.timeline-line) {
                    transform: scaleY(0);
                    transform-origin: top;
                    transition: transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: 280ms;
                }

                .is-visible .timeline-reveal,
                .is-visible :global(.timeline-item) {
                    opacity: 1;
                    transform: translate(0, 0);
                    filter: blur(0);
                }

                .is-visible :global(.timeline-line) {
                    transform: scaleY(1);
                }

                @media (max-width: 767px) {
                    :global(.timeline-item-left),
                    :global(.timeline-item-right) {
                        --timeline-x: 10px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .timeline-reveal,
                    :global(.timeline-item),
                    :global(.timeline-line) {
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

interface EducationTimelineProps {
    items: Education[];
    locale: Locale;
}

function EducationTimeline({ items, locale }: EducationTimelineProps) {
    return (
        <div className="relative">
            <div className="timeline-line absolute left-3.5 top-0 bottom-0 w-0.5 bg-[var(--primary)]/20 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8">
                {items.map((item, index) => (
                    <EducationTimelineCard key={item.id} item={item} locale={locale} index={index} isFirst={index === 0} />
                ))}
            </div>
        </div>
    );
}

interface EducationTimelineCardProps {
    item: Education;
    locale: Locale;
    index: number;
    isFirst: boolean;
}

function EducationTimelineCard({ item, locale, index, isFirst }: EducationTimelineCardProps) {
    const title = `${item.degree[locale]} - ${item.field[locale]}`;
    const period = item.endDate
        ? `${item.startDate[locale]} - ${item.endDate[locale]}`
        : `${item.startDate[locale]} - ${locale === 'id' ? 'Sekarang' : 'Present'}`;
    const isRightSide = index % 2 === 1;

    return (
        <div
            className={cn(
                'timeline-item relative pl-10 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-4 md:pl-0',
                isRightSide ? 'timeline-item-right' : 'timeline-item-left'
            )}
            style={{ '--timeline-delay': `${320 + index * 260}ms` } as CSSProperties}
        >
            <div
                className={cn(
                    'absolute left-0 top-0 z-10 w-7 h-7 rounded-full flex items-center justify-center md:left-1/2 md:-translate-x-1/2',
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

            <div
                className={cn(
                    isRightSide ? 'md:col-start-3' : 'md:col-start-1 md:row-start-1',
                    'p-5 rounded-xl',
                    'bg-[var(--background)]/40 backdrop-blur-sm',
                    'border border-[var(--primary)]/20',
                    'hover:border-[var(--primary)]/40 transition-colors'
                )}
            >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                        <h4 className="font-bold text-[var(--foreground)]">{title}</h4>
                        <p className="text-[var(--primary)] text-sm">{item.institution}</p>
                    </div>
                    <span className="text-xs text-[var(--foreground-muted)] bg-[var(--foreground)]/5 px-2 py-1 rounded">
                        {period}
                    </span>
                </div>

                {item.description && (
                    <p className="text-sm text-[var(--foreground-secondary)] mb-3">
                        {item.description[locale]}
                    </p>
                )}

                {item.gpa && (
                    <p className="text-sm text-[var(--foreground-muted)] mt-2">
                        GPA: <span className="text-[var(--primary)] font-medium">{item.gpa}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export type { EducationSectionProps };
