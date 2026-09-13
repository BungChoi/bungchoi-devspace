# AGENTS.md

> Single entry point and repository map for AI coding agents working on **BungChoi DevSpace**.
> Follow progressive disclosure: use this map to locate detailed documentation before making changes.

---

## 1. Project Overview & Tech Stack

- **Project:** BungChoi DevSpace (Personal Mobile Developer Portfolio)
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 (CSS variables in `app/globals.css`, no `tailwind.config.ts`)
- **Localization:** `next-intl` (`/id` default, `/en` secondary)

---

## 2. Canonical Verification Commands

Agents must run verification before declaring any task complete:

```bash
# Canonical full verification (run before handoff)
npm run verify

# Targeted checks during iteration
npm run lint          # ESLint checks
npm run typecheck     # TypeScript compiler check (noEmit)
npm test              # Vitest test suite (unit, component, data integrity)
npm run test:watch    # Vitest interactive watcher
```

---

## 3. Repository Map (Progressive Disclosure)

Do not assume or guess architecture. Read the relevant documents before editing:

| Topic | Document Path | When to Read |
|---|---|---|
| **Architecture & Layers** | [`docs/technical/ARCHITECTURE.md`](docs/technical/ARCHITECTURE.md) | Adding components, modifying folder structure, or altering imports |
| **Component Architecture** | [`docs/technical/components-architecture.md`](docs/technical/components-architecture.md) | Creating or refactoring UI primitives or section components |
| **Design System & Tokens** | [`docs/technical/DESIGN_SYSTEM.md`](docs/technical/DESIGN_SYSTEM.md) | Styling, spacing, typography, colors, animations |
| **Localization (i18n)** | [`docs/technical/i18n-architecture.md`](docs/technical/i18n-architecture.md) | Adding or modifying user-facing text, locales, or routes |
| **Brand Kit & Bio Data** | [`docs/brand/portfolio-brand-kit.md`](docs/brand/portfolio-brand-kit.md) | Updating personal information, tone, or branding assets |
| **UI Plans & Refinements**| [`docs/ui/ui-refinement-proposal.md`](docs/ui/ui-refinement-proposal.md) | Implementing UI refinements or new layout sections |
| **Active Execution Plans**| [`docs/plans/`](docs/plans/) | Non-trivial multi-step tasks, RFCs, and tracked changes |

---

## 4. Architectural Invariants & Taste Standards

1. **Layer Dependency Direction:**
   - Code may only depend "forward": `Presentation (app, components)` $\rightarrow$ `Data (lib/data)` $\rightarrow$ `Core (lib/types, lib/utils, hooks)`.
   - Never import presentation components into `lib/` or `hooks/`.
2. **Design System & Styling:**
   - Never use arbitrary hardcoded hex codes or inline styles. Use semantic Tailwind classes mapped to CSS custom properties defined in [`app/globals.css`](app/globals.css).
   - Use `cn()` from `@/lib/utils` for conditional classes.
3. **Data Integrity & Parsing at Boundary:**
   - Static portfolio data (`lib/data/*`) must conform to Zod schemas in `lib/schemas/`.
   - Every multi-language content must use `LocalizedString` (`{ id: string; en: string }`).
   - Run `npm test` to mechanically ensure data integrity.
4. **Modal vs Route Pattern:**
   - Project cards on Home and Projects pages open `ProjectModal` (`components/ui/ProjectModal.tsx`), not a separate route.
5. **Execution Planning:**
   - For non-trivial changes, copy [`docs/plans/TEMPLATE.md`](docs/plans/TEMPLATE.md) into `docs/plans/<task-name>.md` and record intent, checklist, and decisions before modifying code.
