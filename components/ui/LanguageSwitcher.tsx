'use client';

/**
 * ===========================================
 * LANGUAGE SWITCHER COMPONENT
 * ===========================================
 * Toggle between ID/EN languages.
 * Uses next-intl navigation to switch locales.
 */

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
    className?: string;
    showLabel?: boolean;
}

export function LanguageSwitcher({ className, showLabel }: LanguageSwitcherProps) {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const handleSwitch = (newLocale: Locale) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
        }
    };

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {showLabel && (
                <span className="text-xs text-[var(--foreground-muted)] mr-1">
                    Language:
                </span>
            )}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--background-tertiary)]/50">
                {locales.map((loc) => (
                    <button
                        key={loc}
                        onClick={() => handleSwitch(loc)}
                        className={cn(
                            'px-2 py-1 text-xs font-medium rounded-full transition-all',
                            locale === loc
                                ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                        )}
                    >
                        {loc.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}

export type { LanguageSwitcherProps };
