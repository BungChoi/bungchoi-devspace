'use client';

/**
 * ===========================================
 * HERO — R1 layout (99% composition match)
 * ===========================================
 * Structure mirrors Dymas reference:
 * 1) Full-width display name
 * 2) 3-column row: pitch | portrait (no card) | socials
 * 3) Portrait overlaps name; sides align to photo bottom
 * No floating panel / photo card chrome.
 */

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/types';

interface HeroSectionProps {
    className?: string;
}

const NAME_LINE_1 = 'AHMAD CHOIRUL';
const NAME_LINE_2 = 'UMAM ALI ROZAQI';

const HERO_PORTRAIT = '/images/about/hero-portrait-dummy.png';

export function HeroSection({ className }: HeroSectionProps) {
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const { name, title, email, socialLinks } = personalInfo;

    const pitch =
        locale === 'id'
            ? 'Membangun aplikasi mobile yang rapi, intuitif, dan mudah dirawat — dari UI sampai integrasi API.'
            : 'Building clean, intuitive, maintainable mobile apps — from UI to API integration.';

    const contactLinks = [
        { name: 'Email', url: `mailto:${email}`, icon: 'mail' },
        ...socialLinks,
    ];

    return (
        <section
            id="home"
            className={cn(
                'hero-shell relative w-full scroll-mt-24',
                'flex items-center justify-center',
                'min-h-[100svh]',
                'px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-14 lg:px-6 xl:px-8',
                className
            )}
        >
            <div className="hero-root w-full max-w-[1600px]">
                {/* 1) Name — sits above, photo pulls into it */}
                <h1 className="hero-name" aria-label={name}>
                    <span className="hero-name-line hero-name-outline">{NAME_LINE_1}</span>
                    <span className="hero-name-line hero-name-solid">{NAME_LINE_2}</span>
                </h1>

                {/* 2) Body row: left | photo | right  (R1) */}
                <div className="hero-row">
                    {/* LEFT */}
                    <div className="hero-col hero-col-left">
                        <p className="hero-role">{title[locale]}</p>
                        <p className="hero-pitch">{pitch}</p>
                        {/* Tailwind (not styled-jsx) so next-intl Link reliably receives styles */}
                        <Link
                            href="/#projects"
                            className={cn(
                                'mt-5 inline-flex items-center justify-center gap-1.5',
                                'rounded-full bg-[var(--primary)] px-6 py-3',
                                'text-[0.9375rem] font-medium leading-none text-[var(--primary-foreground)]',
                                'shadow-sm transition-colors hover:bg-[var(--primary-hover)]'
                            )}
                        >
                            {tCommon('viewProject')}
                            <ArrowUpRight />
                        </Link>
                    </div>

                    {/* CENTER PHOTO — no card, natural cutout */}
                    <div className="hero-col hero-col-photo">
                        <Image
                            src={HERO_PORTRAIT}
                            alt={name}
                            width={800}
                            height={1000}
                            priority
                            className="hero-img"
                            sizes="(max-width: 1024px) 280px, 400px"
                        />
                    </div>

                    {/* RIGHT SOCIALS — fixed equal width (R1 stack) */}
                    <ul className="hero-col hero-col-socials m-0 flex w-[9.5rem] list-none flex-col items-stretch gap-2.5 p-0 pb-1 sm:w-[10rem]">
                        {contactLinks.map((link) => (
                            <li key={link.name} className="w-full">
                                <a
                                    href={link.url}
                                    target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                                    rel={
                                        link.url.startsWith('mailto:')
                                            ? undefined
                                            : 'noopener noreferrer'
                                    }
                                    className={cn(
                                        'flex w-full items-center gap-2.5',
                                        'rounded-full border border-[var(--border)] bg-[var(--card)]',
                                        'px-3.5 py-2.5 text-[0.9375rem] font-medium leading-none text-[var(--foreground-secondary)]',
                                        'transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]',
                                        'lg:px-4 lg:py-3 lg:text-base'
                                    )}
                                >
                                    <span
                                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center lg:h-[1.35rem] lg:w-[1.35rem]"
                                        aria-hidden
                                    >
                                        <SocialIcon name={link.icon} />
                                    </span>
                                    <span className="whitespace-nowrap">{link.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <style jsx>{`
                .hero-root {
                    font-family: var(--font-space), var(--font-geist-sans), system-ui, sans-serif;
                }

                @media (min-width: 900px) and (min-height: 700px) {
                    .hero-shell {
                        align-items: flex-end;
                        padding-bottom: clamp(2rem, 4vh, 3rem);
                    }

                    .hero-root {
                        transform: none;
                    }
                }

                @media (min-width: 900px) and (max-height: 699px) {
                    .hero-root {
                        transform: translateY(1rem);
                    }
                }

                /* ——— Name ——— */
                .hero-name {
                    position: relative;
                    top: -1.75rem;
                    z-index: 1;
                    margin: 0;
                    text-align: center;
                    font-weight: 700;
                    text-transform: uppercase;
                    line-height: 0.9;
                    letter-spacing: -0.04em;
                    /* Large name, still readable on 2 lines */
                    font-size: clamp(2.25rem, 8vw, 6rem);
                    pointer-events: none;
                    user-select: none;
                }

                .hero-name-line {
                    display: block;
                }

                .hero-name-outline {
                    color: transparent;
                    -webkit-text-stroke: 1.75px var(--foreground);
                }

                .hero-name-solid {
                    color: var(--foreground);
                }

                /*
                 * Wider left–right span:
                 * side columns take remaining width; content sits near
                 * outer edges of the hero root (not glued to photo).
                 * Gap between columns stays moderate (not empty 1fr gap).
                 */
                .hero-row {
                    position: relative;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: minmax(12rem, 1fr) auto minmax(12rem, 1fr);
                    align-items: end;
                    column-gap: 1.5rem;
                    margin-top: clamp(-3.25rem, -5.5vw, -2.25rem);
                    width: 100%;
                }

                .hero-col-left {
                    justify-self: start;
                    width: 100%;
                    max-width: 18.5rem;
                    padding-bottom: 0.35rem;
                    font-family: var(--font-geist-sans), system-ui, sans-serif;
                    text-align: left;
                }

                .hero-col-photo {
                    width: min(58vw, 340px);
                    justify-self: center;
                    /* No card chrome */
                    background: transparent;
                    border: 0;
                    box-shadow: none;
                    border-radius: 0;
                    line-height: 0;
                }

                /* Next/Image — cutout only */
                .hero-col-photo :global(img.hero-img),
                .hero-col-photo :global(.hero-img) {
                    display: block;
                    width: 100%;
                    height: auto;
                    background: transparent !important;
                    border: 0 !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    object-fit: contain;
                    object-position: center bottom;
                }

                .hero-col-socials {
                    justify-self: end;
                    /* Shift stack slightly toward the photo */
                    margin-right: clamp(2.5rem, 7vw, 6rem);
                    font-family: var(--font-geist-sans), system-ui, sans-serif;
                }

                .hero-role {
                    margin: 0;
                    font-size: 1.375rem;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                    color: var(--foreground);
                }

                .hero-pitch {
                    margin: 0.55rem 0 0;
                    font-size: 1rem;
                    line-height: 1.55;
                    color: var(--foreground-secondary);
                }

                @media (min-width: 1024px) {
                    .hero-name {
                        top: clamp(-3rem, -6vh, -3rem);
                        font-size: clamp(4.75rem, 7.1vw, 7.5rem);
                    }
                    .hero-name-outline {
                        -webkit-text-stroke-width: 2.25px;
                    }
                    .hero-row {
                        grid-template-columns: minmax(15rem, 1fr) auto minmax(15rem, 1fr);
                        column-gap: 1.5rem;
                        margin-top: -4.75rem;
                    }
                    .hero-col-photo {
                        width: 360px;
                    }
                    .hero-col-left {
                        max-width: 19rem;
                    }
                    .hero-role {
                        font-size: 1.5rem;
                    }
                    .hero-pitch {
                        font-size: 1.0625rem;
                    }
                }

                @media (min-width: 1280px) {
                    .hero-root {
                        max-width: 1680px;
                    }
                    .hero-name {
                        font-size: clamp(5.5rem, 7.2vw, 8rem);
                    }
                    .hero-name-outline {
                        -webkit-text-stroke-width: 2.4px;
                    }
                    .hero-row {
                        grid-template-columns: minmax(16rem, 1fr) auto minmax(16rem, 1fr);
                        column-gap: 1.75rem;
                        margin-top: -5.25rem;
                    }
                    .hero-col-photo {
                        width: 380px;
                    }
                    .hero-col-left {
                        max-width: 20rem;
                    }
                    .hero-role {
                        font-size: 1.625rem;
                    }
                    .hero-pitch {
                        font-size: 1.125rem;
                        line-height: 1.55;
                    }
                }

                @media (min-width: 1536px) {
                    .hero-root {
                        max-width: 1760px;
                    }
                    .hero-row {
                        grid-template-columns: minmax(17rem, 1fr) auto minmax(17rem, 1fr);
                    }
                    .hero-col-left {
                        max-width: 21rem;
                    }
                }

                /* Mobile stack */
                @media (max-width: 899px) {
                    .hero-name {
                        font-size: clamp(2rem, 9.2vw, 3.35rem);
                    }
                    .hero-name-outline {
                        -webkit-text-stroke-width: 1.4px;
                    }
                    .hero-row {
                        grid-template-columns: 1fr;
                        justify-items: center;
                        justify-content: center;
                        margin-top: -1.75rem;
                        row-gap: 1.5rem;
                        column-gap: 0;
                    }
                    .hero-col-photo {
                        order: -1;
                        width: min(70vw, 280px);
                    }
                    .hero-col-left {
                        order: 0;
                        width: auto;
                        max-width: 20rem;
                        justify-self: center;
                        text-align: center;
                    }
                    .hero-col-socials {
                        order: 1;
                        justify-self: center;
                        margin-right: 0;
                    }
                    .hero-col-photo {
                        justify-self: center;
                    }
                }
            `}</style>
        </section>
    );
}

function ArrowUpRight() {
    return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
    );
}

function SocialIcon({ name }: { name: string }) {
    const cls = 'h-full w-full';
    switch (name.toLowerCase()) {
        case 'mail':
            return (
                <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
            );
        case 'github':
            return (
                <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.879 1.44 1.44 0 0 0 0-2.879z" />
                </svg>
            );
        default:
            return <span className="text-[10px] font-semibold">{name[0]}</span>;
    }
}

export type { HeroSectionProps };
