# Architecture

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4 via @tailwindcss/vite
- KaTeX stylesheet available for future structured math rendering
- Lucide React icons
- Vitest + Testing Library for unit and UI tests
- Cloudflare Pages is the intended static deployment target

## Current modules

- src/App.tsx: responsive app shell, navigation, dashboard, lesson, practice, lab, and progress screens.
- src/data/curriculum.ts: typed learning-path and starter-question content.
- src/math/fractions.ts: Bengali numeral normalization and exact rational comparison using BigInt.
- src/math/fractions.test.ts: validator tests.
- src/index.css: responsive visual system and component styles.
- src/test/setup.ts: Testing Library matchers.

## State and persistence

The first slice works without credentials. Progress is stored under easy-math-progress-v1 in browser localStorage. This is suitable for an anonymous prototype only. It is not secure, account-linked, or synchronized across devices. Never store secrets in Vite environment variables; all VITE_* values are exposed to the browser.

## Mathematical correctness

Fraction validation parses integers, decimals, and fractions into exact rational values and compares by cross multiplication. It accepts Bengali digits and does not use floating-point arithmetic for equivalence. This validator is intentionally narrow; it is not a general symbolic algebra engine. Do not use it to validate algebraic expressions.

## Future Supabase integration

When accounts and cross-device persistence are introduced:
- Use Supabase Auth and Postgres.
- Add RLS policies for every user-owned table.
- Validate attempts and award XP through trusted database functions or server-side logic.
- Keep public curriculum separate from private progress.
- Define idempotency and merge rules before syncing anonymous progress.

## Quality gates

Run npm test and npm run build before merging. Add UI tests for navigation, lesson completion, answer feedback, and local progress before expanding the question bank.
