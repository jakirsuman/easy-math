# Easy Math — Product Requirements

## Product goal

Build a standalone, Bengali-first mathematics learning web app that helps learners move from foundational arithmetic toward advanced topics using clear explanations, visual models, guided practice, feedback, and mastery-based progression.

## MVP audience

General learners from beginner to developing mathematics. The initial experience is not tied to one grade or examination board. Bengali is the default language, with mathematical notation and familiar English terms used when helpful.

## MVP learning paths

1. Number sense and arithmetic.
2. Fractions, decimals, and percentages.
3. Ratio, proportion, and introductory algebra.
4. Geometry and measurement.

The repository includes the initial curriculum map, but many lessons are intentionally marked “coming soon”. Do not imply the complete curriculum is already authored.

## MVP user-facing features

- Responsive dashboard with next lesson, learning paths, and local progress.
- Lesson player with learning objectives, worked explanations, interactive models, hints, completion feedback, and practice entry point.
- Interactive fraction model and fraction/decimal/percentage explorer.
- Short practice session with immediate feedback and worked explanations.
- Local persistence for XP, completed lessons, and answer statistics.
- Progress view with per-path completion and accuracy.
- Bengali-first navigation and responsive mobile navigation.

## Learning and assessment rules

- Mathematical answer checking should be deterministic for supported input types.
- Fraction equivalence must be evaluated numerically, not by string equality.
- Question content must include a canonical answer and a reviewed explanation before publication.
- Mastery should eventually require a documented assessment threshold and sufficient question coverage; lesson completion alone is not proof of mastery.
- The MVP currently uses a small curated practice set. Expand content only with correctness and difficulty review.

## Out of scope for the first slice

- AI-generated solutions or unrestricted AI tutoring.
- Handwriting/camera equation recognition.
- Teacher/parent dashboards, paid plans, leaderboards, native mobile apps.
- Full calculus and advanced curriculum authoring.
- Cross-device account sync until Supabase and RLS policies are configured.

## Initial success criteria

- npm run build succeeds.
- npm test passes.
- Bengali fraction lesson, visualizer, practice, local progress, and fraction-equivalence checker work on desktop and mobile.
- Invalid numeric input and zero denominators are rejected by the exact fraction validator.
- The UI communicates that progress is local-only until accounts and sync are implemented.
