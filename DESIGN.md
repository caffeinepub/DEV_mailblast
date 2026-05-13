# Design Brief

## Direction

Forest Editorial — a marketing email platform with the visual precision of a publishing tool, not a generic SaaS dashboard.

## Tone

Editorial restraint: maximum information density, zero decoration, every element earns its place.

## Differentiation

Deep forest green sidebar against crisp off-white content — unexpected for email tools, immediately recognizable as a premium productivity instrument.

## Color Palette

| Token      | OKLCH           | Role                                  |
| ---------- | --------------- | ------------------------------------- |
| background | 0.98 0.006 150  | Cool off-white with green undertone   |
| foreground | 0.16 0.018 155  | Deep forest ink for body text         |
| card       | 1.0 0.003 150   | Pure white card surfaces              |
| primary    | 0.38 0.14 155   | Forest green — CTAs, active states    |
| accent     | 0.58 0.10 155   | Mid sage — hover states, badges       |
| muted      | 0.94 0.012 150  | Subtle tinted wash for alt rows       |
| sidebar    | 0.22 0.04 155   | Dark forest sidebar surface           |

## Typography

- Display: Space Grotesk — headings, nav labels, stat numbers (tight tracking, bold weight)
- Body: General Sans — table cells, form labels, body copy (regular weight, relaxed)
- Scale: hero `text-3xl font-bold tracking-tight font-display`, h2 `text-xl font-semibold font-display`, label `text-xs font-semibold tracking-widest uppercase`, body `text-sm font-body`

## Elevation & Depth

Three layers: sidebar (darkest), card on background (subtle border + 1px shadow), popover (elevated shadow) — no glows.

## Structural Zones

| Zone    | Background         | Border              | Notes                              |
| ------- | ------------------ | ------------------- | ---------------------------------- |
| Sidebar | bg-sidebar         | border-r sidebar    | Dark forest, white nav items       |
| Header  | bg-card            | border-b border     | Sticky, app title + breadcrumbs    |
| Content | bg-background      | —                   | Off-white, cards float on surface  |
| Footer  | bg-muted/40        | border-t border     | Minimal, version/legal only        |

## Spacing & Rhythm

Section gaps `gap-6`, card padding `p-5`, table rows `py-3 px-4`, sidebar items `px-3 py-2`.

## Component Patterns

- Buttons: `rounded-md` primary=forest green, ghost=transparent border, hover darkens 8%
- Cards: `rounded-md border shadow-subtle bg-card`, no heavy shadows
- Badges: `rounded-full text-xs px-2 py-0.5` — Active=green, Draft=muted, Sent=accent

## Motion

- Entrance: fade-in `opacity-0 → opacity-100` over 150ms ease-out for page sections
- Hover: `transition-smooth` on all interactive elements (200ms cubic-bezier)
- Decorative: none — productivity tools don't animate for decoration

## Constraints

- No gradients anywhere — flat surfaces only
- No shadows heavier than `shadow-elevated` — no glow or colored shadows
- Sidebar stays dark in both light and dark mode — it is the constant anchor

## Signature Detail

Dark forest green sidebar as the constant structural anchor — while the content area adapts, the sidebar never changes, creating a grounding visual identity unique in the email marketing category.
