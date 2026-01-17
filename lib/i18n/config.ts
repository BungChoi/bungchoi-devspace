/**
 * ===========================================
 * I18N CONFIGURATION
 * ===========================================
 * Locale settings for internationalization.
 */

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';

// Locale display names
export const localeNames: Record<Locale, string> = {
    id: 'Indonesia',
    en: 'English',
};
