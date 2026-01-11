/**
 * ===========================================
 * APPLICATION CONSTANTS
 * ===========================================
 * Centralized constants for the application
 */

// ============================================
// SITE METADATA
// ============================================
export const SITE_CONFIG = {
    name: 'BungChoi DevSpace',
    title: 'BungChoi - Mobile Developer Portfolio',
    description: 'Portfolio website showcasing mobile development projects and skills',
    url: 'https://bungchoi.dev', // Update with your actual domain
    locale: 'id_ID',
    author: 'BungChoi',
} as const;

// ============================================
// NAVIGATION
// ============================================
export const NAV_ITEMS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
] as const;

// ============================================
// SOCIAL LINKS
// ============================================
export const SOCIAL_LINKS = [
    {
        name: 'GitHub',
        url: 'https://github.com/BungChoi',
        icon: 'github',
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/bungchoi',
        icon: 'linkedin',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/bungchoi',
        icon: 'twitter',
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/bungchoi',
        icon: 'instagram',
    },
] as const;

// ============================================
// ANIMATION DURATIONS (in ms)
// ============================================
export const ANIMATION = {
    fast: 150,
    base: 200,
    slow: 300,
    slower: 500,
} as const;

// ============================================
// BREAKPOINTS (in px)
// ============================================
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

// ============================================
// Z-INDEX LAYERS
// ============================================
export const Z_INDEX = {
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
} as const;
