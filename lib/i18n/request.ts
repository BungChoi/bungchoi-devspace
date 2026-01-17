/**
 * ===========================================
 * I18N REQUEST CONFIG
 * ===========================================
 * Server-side request configuration for next-intl.
 */

import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    // Get locale from request
    let locale = await requestLocale;

    // Validate locale
    if (!locale || !locales.includes(locale as Locale)) {
        locale = 'id';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
