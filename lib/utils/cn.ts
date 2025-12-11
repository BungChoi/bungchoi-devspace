/**
 * ===========================================
 * CLASS NAME UTILITY
 * ===========================================
 * Utility function to merge Tailwind CSS classes
 * This is a simple implementation without external deps
 */

/**
 * Combines multiple class names into a single string
 * Filters out falsy values (null, undefined, false, '')
 * 
 * @example
 * cn('base-class', isActive && 'active', className)
 * // Returns: 'base-class active custom-class'
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}
