'use client';

/**
 * ===========================================
 * NAVBAR COMPONENT
 * ===========================================
 * Fixed navigation bar with glassmorphism effect.
 * Centered layout with logo, nav items, and CTA button.
 *
 * @example
 * <Navbar />
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

interface NavbarProps {
    /** Additional CSS classes */
    className?: string;
}

// ============================================
// COMPONENT
// ============================================

export function Navbar({ className }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle smooth scroll to section
    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile menu after clicking
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
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="px-4 py-2 font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                        {SITE_CONFIG.author}
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.filter((item) => item.label !== 'Contact').map(
                            (item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={cn(
                                        'px-4 py-2 text-sm font-medium rounded-full',
                                        'text-[var(--foreground-secondary)]',
                                        'hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]',
                                        'transition-all duration-200'
                                    )}
                                >
                                    {item.label}
                                </a>
                            )
                        )}
                    </div>

                    {/* CTA Button */}
                    <Button
                        size="sm"
                        className="hidden md:inline-flex ml-2"
                        onClick={() => {
                            document.getElementById('contact')?.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                    >
                        Contact Me
                    </Button>

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
                onNavClick={handleNavClick}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </header>
    );
}

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Hamburger icon with animation
 */
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

/**
 * Mobile menu dropdown
 */
interface MobileMenuProps {
    isOpen: boolean;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
    onClose: () => void;
}

function MobileMenu({ isOpen, onNavClick, onClose }: MobileMenuProps) {
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
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => onNavClick(e, item.href)}
                        className={cn(
                            'px-4 py-3 text-sm font-medium rounded-xl',
                            'text-[var(--foreground-secondary)]',
                            'hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]',
                            'transition-all duration-200'
                        )}
                    >
                        {item.label}
                    </a>
                ))}

                {/* Mobile CTA Button */}
                <Button
                    className="mt-2"
                    onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({
                            behavior: 'smooth',
                        });
                        onClose();
                    }}
                >
                    Contact Me
                </Button>
            </div>
        </div>
    );
}

// ============================================
// EXPORTS
// ============================================

export type { NavbarProps };
