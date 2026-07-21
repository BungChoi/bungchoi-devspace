'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
    className?: string;
}

const THEME_STORAGE_KEY = 'theme';
const themeListeners = new Set<() => void>();

function getPreferredTheme(): Theme {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    themeListeners.forEach((listener) => listener());
}

function subscribeToTheme(listener: () => void) {
    themeListeners.add(listener);
    return () => {
        themeListeners.delete(listener);
    };
}

function getThemeSnapshot(): Theme {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function getServerThemeSnapshot(): Theme {
    return 'light';
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const t = useTranslations('common');
    const theme = useSyncExternalStore(
        subscribeToTheme,
        getThemeSnapshot,
        getServerThemeSnapshot
    );

    useEffect(() => {
        if (!document.documentElement.dataset.theme) {
            applyTheme(getPreferredTheme());
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            if (window.localStorage.getItem(THEME_STORAGE_KEY)) return;

            const systemTheme: Theme = event.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const isDark = theme === 'dark';
    const label = isDark ? t('switchToLight') : t('switchToDark');

    const handleToggle = () => {
        const nextTheme: Theme = isDark ? 'light' : 'dark';
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            className={cn(
                'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                'border border-[var(--border)] bg-[var(--card)] text-[var(--foreground-secondary)]',
                'transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
                className
            )}
            aria-label={label}
            aria-pressed={isDark}
            title={label}
        >
            {isDark ? <MoonIcon /> : <SunIcon />}
        </button>
    );
}

function SunIcon() {
    return (
        <svg className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M20.4 14.6A8 8 0 0 1 9.4 3.6 8.5 8.5 0 1 0 20.4 14.6Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export type { ThemeToggleProps };
