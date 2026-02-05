/**
 * ===========================================
 * LOCALIZATION UTILITIES
 * ===========================================
 * Helper functions for handling LocalizedString in data files
 */

import type { LocalizedString } from '@/lib/types';
import type { Locale } from '@/lib/i18n/config';

/**
 * Get localized string value
 * @param str - LocalizedString object with id/en keys
 * @param locale - Current locale ('id' | 'en')
 * @returns The string for the given locale
 */
export function t(str: LocalizedString | string | undefined, locale: Locale): string {
    if (!str) return '';
    if (typeof str === 'string') return str;
    return str[locale] || str.id || '';
}

/**
 * Get localized array of strings
 * @param arr - Array of LocalizedString objects
 * @param locale - Current locale
 * @returns Array of strings for the given locale
 */
export function tArray(arr: LocalizedString[] | string[] | undefined, locale: Locale): string[] {
    if (!arr) return [];
    return arr.map(item => {
        if (typeof item === 'string') return item;
        return item[locale] || item.id || '';
    });
}

/**
 * Helper to create LocalizedString inline (cleaner syntax)
 * @param id - Indonesian text
 * @param en - English text
 * @returns LocalizedString object
 * 
 * @example
 * ls('Aplikasi mobile', 'Mobile app')
 * // Returns: { id: 'Aplikasi mobile', en: 'Mobile app' }
 */
export function ls(id: string, en: string): LocalizedString {
    return { id, en };
}

/**
 * Helper to create array of LocalizedStrings
 * @param items - Array of [id, en] tuples
 * @returns Array of LocalizedString objects
 * 
 * @example
 * lsArray([
 *   ['Item 1 ID', 'Item 1 EN'],
 *   ['Item 2 ID', 'Item 2 EN'],
 * ])
 */
export function lsArray(items: [string, string][]): LocalizedString[] {
    return items.map(([id, en]) => ({ id, en }));
}
