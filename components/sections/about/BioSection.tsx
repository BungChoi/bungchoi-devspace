'use client';

/**
 * ===========================================
 * BIO SECTION - ABOUT PAGE
 * ===========================================
 * Personal introduction with avatar and stats.
 */

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/lib/data';

// ============================================
// TYPES
// ============================================

interface BioSectionProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function BioSection({ className }: BioSectionProps) {
    const { name, title, bio, email, location, avatar, resumeUrl, stats, socialLinks } = personalInfo;

    return (
        <section className={cn('py-20 sm:py-28', className)}>
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    {/* Left: Avatar & Quick Info */}
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                        {/* Avatar */}
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6 rounded-2xl overflow-hidden border-2 border-[var(--primary)]/30 shadow-xl">
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center">
                                    <span className="text-6xl">👨‍💻</span>
                                </div>
                            )}
                        </div>

                        {/* Quick Info */}
                        <div className="text-center lg:text-left space-y-2 mb-6">
                            <p className="text-[var(--foreground-secondary)] flex items-center justify-center lg:justify-start gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {location}
                            </p>
                            <a
                                href={`mailto:${email}`}
                                className="text-[var(--primary)] hover:underline flex items-center justify-center lg:justify-start gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {email}
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center',
                                        'bg-[var(--foreground)]/5 border border-[var(--foreground)]/10',
                                        'hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 hover:text-[var(--primary)]',
                                        'transition-all duration-300'
                                    )}
                                    aria-label={link.name}
                                >
                                    <SocialIcon name={link.icon} />
                                </a>
                            ))}
                        </div>

                        {/* Download CV Button */}
                        {resumeUrl && (
                            <Link
                                href={resumeUrl}
                                className={cn(
                                    'inline-flex items-center gap-2',
                                    'px-6 py-3 rounded-full',
                                    'bg-[var(--primary)] text-white font-medium',
                                    'hover:bg-[var(--primary)]/90 transition-colors',
                                    'shadow-lg shadow-[var(--primary)]/25'
                                )}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download CV
                            </Link>
                        )}
                    </div>

                    {/* Right: Bio Content */}
                    <div className="lg:col-span-3">
                        {/* Page Title */}
                        <div className="mb-8">
                            <span className="text-[var(--primary)] font-medium text-sm uppercase tracking-widest">
                                About Me
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-bold mt-2">
                                Hi, I'm <span className="text-gradient">{name.split(' ')[0]}</span>
                            </h1>
                            <p className="text-xl text-[var(--foreground-secondary)] mt-2">{title}</p>
                        </div>

                        {/* Bio Text */}
                        <div className="prose prose-invert max-w-none mb-10">
                            <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed whitespace-pre-line">
                                {bio}
                            </p>
                            <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed mt-4">
                                I'm passionate about creating seamless user experiences and writing clean, maintainable code.
                                When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                                or enjoying music on Spotify.
                            </p>
                        </div>

                        {/* Stats */}
                        {stats && stats.length > 0 && (
                            <div className="grid grid-cols-3 gap-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={cn(
                                            'p-4 rounded-xl text-center',
                                            'bg-[var(--background)]/40 backdrop-blur-sm',
                                            'border border-[var(--primary)]/20'
                                        )}
                                    >
                                        <div className="text-3xl font-bold text-[var(--primary)]">{stat.value}</div>
                                        <div className="text-sm text-[var(--foreground-muted)] mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SOCIAL ICON HELPER
// ============================================

function SocialIcon({ name }: { name: string }) {
    switch (name.toLowerCase()) {
        case 'github':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            );
        default:
            return <span className="text-xs">{name[0]}</span>;
    }
}

// ============================================
// EXPORTS
// ============================================

export type { BioSectionProps };
