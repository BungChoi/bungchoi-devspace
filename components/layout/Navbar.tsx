'use client';

/**
 * ===========================================
 * NAVBAR COMPONENT
 * ===========================================
 * Fixed navigation bar with glassmorphism effect.
 * Includes scroll spy to highlight active section.
 */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher, ThemeToggle } from '@/components/ui';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';
import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface NavbarProps {
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function Navbar({ className }: NavbarProps) {
    const t = useTranslations('navbar');
    const tCommon = useTranslations('common');
    const tHero = useTranslations('hero');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [observedSection, setObservedSection] = useState('home');
    const pathname = usePathname(); // Locale-aware pathname (e.g., /about not /id/about)
    const hireHref = `mailto:${personalInfo.email}`;
    const activeSection = pathname.startsWith('/projects')
        ? 'projects'
        : pathname === '/'
            ? observedSection
            : 'home';

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track active anchor section on the Home page. On project detail pages,
    // keep Projects active because that is the current content context.
    useEffect(() => {
        if (pathname !== '/') {
            return;
        }

        const sectionIds = NAV_ITEMS.map((item) => item.sectionId);
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.target.id) {
                    setObservedSection(visible.target.id);
                }
            },
            {
                rootMargin: '-35% 0px -55% 0px',
                threshold: [0.1, 0.25, 0.5],
            }
        );

        sectionIds.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50',
                'transition-all duration-300',
                className
            )}
        >
            <div className="px-4 pt-4 sm:px-6 lg:px-8">
                {/* Desktop top bar — wide R1 composition */}
                <nav
                    className={cn(
                        'mx-auto hidden w-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-5 px-3 py-2 lg:grid',
                        'transition-[background-color,border-color,box-shadow] duration-300',
                        isScrolled
                            ? 'rounded-full border border-[var(--border)] bg-[var(--card)]/90 shadow-md backdrop-blur-xl'
                            : 'border border-transparent bg-transparent'
                    )}
                >
                    <div className="flex min-w-0 items-center gap-3 justify-self-start">
                        <Link
                            href="/"
                            onClick={handleNavClick}
                            className="px-2 py-2 font-bold text-[var(--foreground)] transition-opacity hover:opacity-70"
                        >
                            {SITE_CONFIG.author}
                        </Link>

                        <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--foreground-secondary)] xl:inline-flex">
                            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_14%,transparent)]" />
                            <span className="whitespace-nowrap">{tHero('available')}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 justify-self-center">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.sectionId;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={cn(
                                        'relative px-3 py-2 text-sm font-medium',
                                        'transition-colors duration-200',
                                        isActive
                                            ? 'text-[var(--foreground)] after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-[var(--foreground)]'
                                            : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
                                    )}
                                >
                                    {t(item.labelKey)}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2 justify-self-end">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <a
                            href={hireHref}
                            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
                        >
                            {tCommon('hireMe')}
                            <span aria-hidden>↗</span>
                        </a>
                    </div>
                </nav>

                {/* Existing mobile bar — redesign follows in the next pass */}
                <nav
                    className={cn(
                        'mx-auto flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-2 py-2 lg:hidden',
                        'transition-all duration-300',
                        isScrolled
                            ? 'bg-[var(--card)]/90 shadow-md backdrop-blur-xl'
                            : 'bg-[var(--card)]/75 backdrop-blur-md'
                    )}
                >
                    <Link
                        href="/"
                        onClick={handleNavClick}
                        className="px-4 py-2 font-bold text-[var(--foreground)] transition-opacity hover:opacity-70"
                    >
                        {SITE_CONFIG.author}
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="rounded-full p-2 transition-colors hover:bg-[var(--background-tertiary)]"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <HamburgerIcon isOpen={isMobileMenuOpen} />
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                activeSection={activeSection}
                onNavClick={handleNavClick}
                onClose={() => setIsMobileMenuOpen(false)}
                hireMeLabel={tCommon('hireMe')}
                hireHref={hireHref}
            />
        </header>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <span
                className={cn(
                    'w-5 h-0.5 bg-[var(--foreground)] transition-all duration-300',
                    isOpen && 'rotate-45 translate-y-1.5'
                )}
            />
            <span
                className={cn(
                    'w-5 h-0.5 bg-[var(--foreground)] transition-all duration-300',
                    isOpen && 'opacity-0'
                )}
            />
            <span
                className={cn(
                    'w-5 h-0.5 bg-[var(--foreground)] transition-all duration-300',
                    isOpen && '-rotate-45 -translate-y-1.5'
                )}
            />
        </div>
    );
}

interface MobileMenuProps {
    isOpen: boolean;
    activeSection: string;
    onNavClick: () => void;
    onClose: () => void;
    hireMeLabel: string;
    hireHref: string;
}

function MobileMenu({ isOpen, activeSection, onNavClick, onClose, hireMeLabel, hireHref }: MobileMenuProps) {
    const t = useTranslations('navbar');

    if (!isOpen) return null;

    return (
        <div className="px-4 pt-2 lg:hidden">
            <div
                className={cn(
                    'flex flex-col gap-1 p-4 rounded-2xl',
                    'bg-[var(--background)]/95 backdrop-blur-xl',
                    'border border-[var(--border)]',
                    'shadow-xl'
                )}
            >
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.sectionId;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavClick}
                            className={cn(
                                'px-4 py-3 text-sm font-medium rounded-xl',
                                'transition-all duration-200',
                                isActive
                                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                    : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                            )}
                        >
                            {t(item.labelKey)}
                        </Link>
                    );
                })}
                {/* Mobile Language Switch */}
                <LanguageSwitcher showLabel className="justify-center mt-2 py-2" />

                {/* Mobile CTA Button */}
                <a
                    href={hireHref}
                    className="mt-2 text-center py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                    onClick={() => onClose()}
                >
                    {hireMeLabel}
                </a>
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { NavbarProps };
