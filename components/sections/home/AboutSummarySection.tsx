'use client';

/**
 * ===========================================
 * ABOUT SUMMARY SECTION
 * ===========================================
 * Compact about content for the single-page Home flow.
 */

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useLocale } from 'next-intl';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/types';

const COUNT_DURATION_MS = 1350;
const COUNT_START_MINIMUM = 80;
const COUNT_START_MULTIPLIER = 16;

interface AboutSummarySectionProps {
    className?: string;
}

export function AboutSummarySection({ className }: AboutSummarySectionProps) {
    const locale = useLocale() as Locale;
    const { bio, stats } = personalInfo;
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDListElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isStatsVisible, setIsStatsVisible] = useState(false);
    const profileTags = locale === 'id'
        ? ['Flutter Mobile', 'UI Implementation', 'API Integration']
        : ['Flutter Mobile', 'UI Implementation', 'API Integration'];

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
            { rootMargin: '0px 0px -18% 0px', threshold: 0.2 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const element = statsRef.current;

        if (!element) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const timeout = window.setTimeout(() => setIsStatsVisible(true), 0);

            return () => window.clearTimeout(timeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsStatsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.35 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [stats?.length]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className={cn(
                'about-summary-section scroll-mt-24 py-20 sm:py-28',
                isVisible && 'is-visible',
                className
            )}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
                    <div
                        className="about-reveal"
                        style={{ '--about-delay': '80ms' } as CSSProperties}
                    >
                        <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">
                            <span className="h-px w-10 bg-[var(--primary)]" />
                            {locale === 'id' ? 'Tentang Saya' : 'About Me'}
                        </span>
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                            {locale === 'id'
                                ? 'Mobile developer yang fokus pada produk yang rapi dan mudah dirawat.'
                                : 'A mobile developer focused on clean, maintainable products.'}
                        </h2>

                        <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--foreground-secondary)]">
                            {locale === 'id'
                                ? 'Saya menempatkan kualitas implementasi sebagai bagian dari pengalaman produk, bukan sekadar urusan teknis di belakang layar.'
                                : 'I treat implementation quality as part of the product experience, not just a technical detail behind the screen.'}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {profileTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-md border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="about-reveal lg:pt-9"
                        style={{ '--about-delay': '180ms' } as CSSProperties}
                    >
                        <p className="whitespace-pre-line text-base leading-relaxed text-[var(--foreground-secondary)]">
                            {bio[locale]}
                        </p>
                    </div>
                </div>

                {stats && stats.length > 0 && (
                    <dl ref={statsRef} className="mt-12 grid gap-4 sm:grid-cols-3">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label[locale]}
                                className="about-reveal rounded-lg border border-[var(--primary)]/20 bg-[var(--background)]/40 p-5 text-center"
                                style={{ '--about-delay': `${280 + index * 110}ms` } as CSSProperties}
                            >
                                <dt className="text-sm text-[var(--foreground-muted)]">{stat.label[locale]}</dt>
                                <dd className="mt-2 text-3xl font-bold tabular-nums text-[var(--primary)]">
                                    <AnimatedStatValue value={stat.value} run={isStatsVisible} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>

            <style jsx>{`
                .about-reveal {
                    opacity: 0;
                    transform: translateY(18px);
                    filter: blur(6px);
                    transition:
                        opacity 720ms cubic-bezier(0.2, 0.8, 0.2, 1),
                        transform 720ms cubic-bezier(0.2, 0.8, 0.2, 1),
                        filter 720ms cubic-bezier(0.2, 0.8, 0.2, 1),
                        border-color 180ms ease;
                    transition-delay: var(--about-delay, 0ms);
                }

                .is-visible .about-reveal {
                    opacity: 1;
                    transform: translateY(0);
                    filter: blur(0);
                }

                @media (prefers-reduced-motion: reduce) {
                    .about-reveal {
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

function AnimatedStatValue({ value, run }: { value: string; run: boolean }) {
    const parsed = useMemo(() => parseStatValue(value), [value]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!run || !parsed) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const timeout = window.setTimeout(() => setCount(parsed.target), 0);

            return () => window.clearTimeout(timeout);
        }

        let frameId = 0;
        const startedAt = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / COUNT_DURATION_MS, 1);

            setCount(getRollingCount(parsed.target, progress));

            if (progress < 1) {
                frameId = window.requestAnimationFrame(tick);
            }
        };

        frameId = window.requestAnimationFrame(tick);

        return () => window.cancelAnimationFrame(frameId);
    }, [parsed, run]);

    if (!parsed) {
        return value;
    }

    return `${parsed.prefix}${count}${parsed.suffix}`;
}

function getRollingCount(target: number, progress: number) {
    const startValue = Math.max(target * COUNT_START_MULTIPLIER, COUNT_START_MINIMUM);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    return Math.round(startValue + ((target - startValue) * easedProgress));
}

function parseStatValue(value: string) {
    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);

    if (!match) {
        return null;
    }

    return {
        prefix: match[1] ?? '',
        target: Number(match[2]),
        suffix: match[3] ?? '',
    };
}

export type { AboutSummarySectionProps };
