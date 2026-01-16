/**
 * ===========================================
 * I18N MIDDLEWARE
 * ===========================================
 * Handles locale detection and routing.
 */

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n/config';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
});

export const config = {
    // Match all pathnames except:
    // - API routes
    // - Next.js internals (_next)
    // - Static files (files with extensions)
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
