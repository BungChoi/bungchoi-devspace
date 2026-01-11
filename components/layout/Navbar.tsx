'use client';

/**
 * ===========================================
 * NAVBAR COMPONENT
 * ===========================================
 * Fixed navigation bar with glassmorphism effect.
 * Includes scroll spy to highlight active section.
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle scroll effect & scroll spy (only for home page sections)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Only run scroll spy on home page
            if (window.location.pathname === '/') {
                const scrollPosition = window.scrollY + 150;
                const homeElement = document.getElementById('home');
                if (homeElement) {
                    const { offsetTop, offsetHeight } = homeElement;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection('home');
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine active section based on current path
    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/') setActiveSection('home');
        else if (path === '/about') setActiveSection('about');
        else if (path === '/projects') setActiveSection('projects');
        else if (path === '/blog') setActiveSection('blog');
    }, []);

    // Handle navigation click
    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        isPage: boolean
    ) => {
        if (!isPage && href === '/') {
            // Home - scroll to top on home page, or navigate to home
            if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        // For page links, let the default navigation happen
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
            {/* Navbar Container - Centered Pill */}
            <div className="flex justify-center px-4 pt-4">
                <nav
                    className={cn(
                        'flex items-center gap-2 px-2 py-2 rounded-full',
                        'border border-[var(--border)]',
                        'transition-all duration-300',
                        isScrolled
                            ? 'bg-[var(--background)]/80 backdrop-blur-xl shadow-lg border-[var(--border)]'
                            : 'bg-[var(--background)]/60 backdrop-blur-md'
                    )}
                >
                    {/* Logo/Brand */}
                    <a
                        href="/"
                        onClick={(e) => handleNavClick(e, '/', false)}
                        className="px-4 py-2 font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                        {SITE_CONFIG.author}
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const linkPath = item.href === '/' ? 'home' : item.href.replace('/', '');
                            const isActive = activeSection === linkPath;

                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href, item.isPage)}
                                    className={cn(
                                        'px-4 py-2 text-sm font-medium rounded-full',
                                        'transition-all duration-200',
                                        isActive
                                            ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                                            : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                                    )}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA Button - Link to About */}
                    <a
                        href="/about"
                        className="hidden md:inline-flex ml-2 px-4 py-2 text-sm font-medium rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors"
                    >
                        Hire Me
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-[var(--background-tertiary)] transition-colors"
                        aria-label="Toggle menu"
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
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage: boolean) => void;
    onClose: () => void;
}

function MobileMenu({ isOpen, activeSection, onNavClick, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="md:hidden px-4 pt-2">
            <div
                className={cn(
                    'flex flex-col gap-1 p-4 rounded-2xl',
                    'bg-[var(--background)]/95 backdrop-blur-xl',
                    'border border-[var(--border)]',
                    'shadow-xl'
                )}
            >
                {NAV_ITEMS.map((item) => {
                    const linkPath = item.href === '/' ? 'home' : item.href.replace('/', '');
                    const isActive = activeSection === linkPath;

                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => onNavClick(e, item.href, item.isPage)}
                            className={cn(
                                'px-4 py-3 text-sm font-medium rounded-xl',
                                'transition-all duration-200',
                                isActive
                                    ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                                    : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                            )}
                        >
                            {item.label}
                        </a>
                    );
                })}

                {/* Mobile CTA Button */}
                <a
                    href="/about"
                    className="mt-2 text-center py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
                    onClick={() => onClose()}
                >
                    Hire Me
                </a>
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { NavbarProps };
