# Easy Math

A Bengali-first mathematics learning web app for learners from beginner to advanced levels. The product emphasizes conceptual understanding, interactive visual learning, guided practice, and mastery-based progression.

## MVP goals

- Four complete learning paths: arithmetic, fractions/decimals/percentages, ratio and introductory algebra, and geometry/measurement.
- Bengali-first lessons with worked examples and targeted practice.
- Reliable deterministic answer checking for supported question types.
- Interactive Math Lab modules, progress tracking, and lightweight gamification.
- Responsive web application deployed on Cloudflare Pages.

## Technology

React, Vite, TypeScript, Tailwind CSS v4, shadcn/ui conventions, KaTeX, and Vitest. Supabase will be added when authenticated cross-device persistence is implemented; the first vertical slice must work without credentials.

## Development

See `docs/PRODUCT_REQUIREMENTS.md` and `docs/ARCHITECTURE.md` for the product scope and technical decisions. The first implementation milestone is a working Bengali fraction lesson with visualization, practice, deterministic validation, and local progress.

## Status

Foundation in progress. Content and mathematical behavior must be reviewed before being treated as production-ready educational material.
