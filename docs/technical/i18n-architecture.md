# Internationalization (i18n) Architecture

## Overview

This document describes the internationalization setup for the BungChoi portfolio website. The implementation uses `next-intl` with URL-based routing for optimal SEO.

## Supported Languages

| Code | Language | Status |
|------|----------|--------|
| `id` | Indonesian | Default |
| `en` | English | Secondary |

## URL Structure

All routes are prefixed with the locale:
- `/id/*` - Indonesian version
- `/en/*` - English version

Root `/` redirects to `/id` by default.

## Directory Structure

```
lib/
├── i18n/
│   ├── config.ts        # Locale configuration
│   ├── request.ts       # next-intl request config
│   └── navigation.ts    # Localized Link, useRouter, usePathname
│
├── messages/
│   ├── id.json          # Indonesian translations
│   └── en.json          # English translations
│
└── types/
    └── messages.d.ts    # Type definitions for messages

app/
├── [locale]/            # Dynamic segment for locale
│   ├── layout.tsx       # IntlProvider wrapper
│   ├── page.tsx         # Home
│   └── ...
└── layout.tsx           # Root layout (html/body only)

middleware.ts            # Locale detection & routing
```

## Translation File Structure

Translations are organized by feature/component:

```json
{
  "common": { ... },      // Shared UI elements
  "navbar": { ... },      // Navigation
  "hero": { ... },        // Hero section
  "sections": { ... },    // Page sections
  "about": { ... },       // About page
  "projects": { ... },    // Projects page
  "footer": { ... }       // Footer
}
```

## Usage in Components

### Server Components
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('common');
  return <h1>{t('title')}</h1>;
}
```

### Client Components
```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('navbar');
  return <nav>{t('home')}</nav>;
}
```

### Navigation
```tsx
import { Link } from '@/lib/i18n/navigation';

<Link href="/about">About</Link>
// Renders: /id/about or /en/about based on current locale
```

## Data Localization

For data files (projects, experience), use localized fields:

```typescript
interface LocalizedString {
  id: string;
  en: string;
}

interface Project {
  title: string; // Same in both languages
  description: LocalizedString;
}
```

Helper to get localized value:
```typescript
function getLocalized<T>(obj: LocalizedString, locale: Locale): string {
  return obj[locale];
}
```

## SEO Considerations

1. **hreflang tags** - Added to `<head>` for alternate language versions
2. **html lang** - Set via `<html lang={locale}>`
3. **Canonical URLs** - Each locale has its own canonical
4. **Sitemap** - Generate entries for both locales

## Language Switcher

Located in Navbar, switches between locales while preserving the current path:
- On `/id/projects` clicking "EN" → `/en/projects`
- On `/en/about` clicking "ID" → `/id/about`
