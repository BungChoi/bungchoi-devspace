'use client';

/**
 * ===========================================
 * HERO SECTION COMPONENT - UPGRADED
 * ===========================================
 * Modern landing section with animated background,
 * stats badges, and enhanced visual effects.
 */

import { Button } from '@/components/ui';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface HeroProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function Hero({ className }: HeroProps) {
    const { name, title, subtitle, bio, stats, socialLinks } = personalInfo;

    return (
        <section
            id="home"
            className={cn(
                'relative min-h-screen flex items-center justify-center overflow-hidden',
                'py-20 px-4',
                className
            )}
        >
            {/* Enhanced Background */}
            <HeroBackground />

            {/* Content Container */}
            <div className="container max-w-5xl mx-auto relative z-10">
                <div className="text-center">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                        </span>
                        Available for new projects
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        <span className="block text-[var(--foreground)]">Hi, I&apos;m</span>
                        <span className="text-gradient">{name}</span>
                    </h1>

                    {/* Title & Subtitle */}
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--foreground)]">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-lg text-[var(--primary)] mt-1 font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Bio */}
                    <p className="text-base sm:text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
                        {bio}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Button
                            size="lg"
                            onClick={() => {
                                document.getElementById('projects')?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <FolderIcon />
                                View My Work
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <MailIcon />
                                Get In Touch
                            </span>
                        </Button>
                    </div>

                    {/* Stats Badges */}
                    {stats && stats.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-3xl sm:text-4xl font-bold text-gradient">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-[var(--foreground-muted)] mt-1">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all duration-300"
                                aria-label={link.name}
                            >
                                <SocialIcon name={link.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2 text-[var(--foreground-muted)]">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 border-2 border-[var(--border)] rounded-full flex justify-center">
                        <div className="w-1.5 h-3 bg-[var(--primary)] rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Enhanced animated background with gradient mesh
 */
function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[var(--background)]" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary)] opacity-15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--accent)] opacity-10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-primary-600)] opacity-5 rounded-full blur-[100px]" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                                      linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Radial gradient for vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
        </div>
    );
}

/**
 * Social media icons
 */
function SocialIcon({ name }: { name: string }) {
    const iconSize = 'w-5 h-5';

    switch (name.toLowerCase()) {
        case 'github':
            return (
                <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            );
        case 'twitter':
            return (
                <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
            );
        default:
            return (
                <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            );
    }
}

/**
 * Small icons for CTA buttons
 */
function FolderIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { HeroProps };
