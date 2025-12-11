/**
 * ===========================================
 * UTILITY FUNCTIONS
 * ===========================================
 * Re-export all utility functions
 */

export { cn } from './cn';

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, locale = 'id-ID'): string {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
    });
}

/**
 * Check if we're running on the client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if we're running on the server side
 */
export const isServer = !isClient;

/**
 * Delay execution for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}
