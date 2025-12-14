'use client';

/**
 * ===========================================
 * HERO SECTION COMPONENT
 * ===========================================
 * The main landing section of the portfolio.
 * Displays name, title, bio, and call-to-action buttons.
 *
 * @example
 * <Hero />
 */

import { Button } from '@/components/ui';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface HeroProps {
    /** Additional CSS classes */
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function Hero({ className }: HeroProps) {
    const { name, title, subtitle, bio } = personalInfo;

    return (
        <section
            id="home"
            className={cn(
                'relative min-h-screen flex items-center justify-center',
                'py-20 px-4',
                className
            )}
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--background)] dark:from-[var(--color-primary-950)] dark:via-[var(--background)] dark:to-[var(--background)]" />
                {/* Optional: Decorative blur circles */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)] opacity-10 rounded-full blur-3xl" />
            </div>

            {/* Content Container */}
            <div className="container max-w-4xl mx-auto text-center">
                {/* Greeting Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-950)] text-[var(--primary)] text-sm font-medium mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                    </span>
                    Available for new projects
                </div>

                {/* Name */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                    Hi, I&apos;m{' '}
                    <span className="text-gradient">{name}</span>
                </h1>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--foreground-secondary)] mb-2">
                    {title}
                </h2>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-lg text-[var(--foreground-muted)] mb-6">
                        {subtitle}
                    </p>
                )}

                {/* Bio */}
                <p className="text-base sm:text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
                    {bio}
                </p>

                {/* CTA Buttons - Testing our Button component! */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        onClick={() => {
                            document.getElementById('projects')?.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                    >
                        View My Work
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
                        Get In Touch
                    </Button>
                </div>

                {/* Social Links - Simple version for now */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    {personalInfo.socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors duration-200"
                            aria-label={link.name}
                        >
                            <SocialIcon name={link.icon} />
                        </a>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-[var(--border)] rounded-full flex justify-center">
                        <div className="w-1.5 h-3 bg-[var(--foreground-muted)] rounded-full mt-2 animate-pulse" />
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
 * Simple SVG icons for social links
 * In a real project, you might use a library like lucide-react
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

// ============================================
// EXPORTS
// ============================================

export type { HeroProps };
