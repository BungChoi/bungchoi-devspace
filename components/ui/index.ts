/**
 * ===========================================
 * UI COMPONENTS BARREL EXPORT
 * ===========================================
 * Re-export all UI components for cleaner imports
 *
 * @example
 * import { Button, Card, Badge } from '@/components/ui';
 */

// Button
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Card
export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardImage,
} from './Card';
export type { CardProps, CardVariant, CardSectionProps, CardTitleProps } from './Card';

// Badge
export { Badge, BadgeGroup } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeGroupProps } from './Badge';

// Language Switcher
export { LanguageSwitcher } from './LanguageSwitcher';
export type { LanguageSwitcherProps } from './LanguageSwitcher';
