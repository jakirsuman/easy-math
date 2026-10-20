# Easy Math curriculum content guide

## Typography for numerical learning

Use **Noto Sans Bengali** for Bengali glyphs and Bengali numerals, with **Inter** retained as the preferred Latin interface font. Numerical counters, fractions, scores, and live model outputs should prefer Noto Sans Bengali and use tabular numeral spacing where supported. Avoid applying Latin-only font stacks to elements that contain Bengali digits or mixed-script text. Preserve comfortable line height for Bengali conjuncts and vowel marks.

## Learner experience
Each available lesson follows a Bengali-first sequence:

1. **Concept** — explain the idea in everyday language.
2. **Worked example** — connect the idea to a familiar situation and show the calculation.
3. **Guided steps** — make the reasoning explicit instead of presenting a formula alone.
4. **Common mistake** — address a likely misconception.
5. **Knowledge check** — select an answer and receive immediate feedback with an explanation.
6. **Takeaways and hint** — recap the key ideas and provide optional support.
7. **Completion and practice** — save lesson completion locally and continue to practice.

Fraction lessons use an interactive fraction model. The Math Lab now includes three hands-on explorations: fraction/percentage equivalence, an adjustable algebra balance model, and a rectangle explorer with live perimeter and area calculations. Progress bars are calculated from completed lessons in each learning path.

## Current coverage
The four learning paths now contain 27 guided lessons:
- Number sense and arithmetic: place value, number line, four operations, factors and multiples, positive and negative numbers, order of operations, HCF/LCM, and averages.
- Fractions, decimals and percentages: fraction basics, equivalent fractions, fraction practice, decimals, percentages, fraction addition/subtraction, decimal operations, fraction multiplication/division, and decimal rounding.
- Ratio and algebra: ratio, variables and expressions, one-step equations, proportion and unit price, and two-step equations.
- Geometry and measurement: shapes, perimeter and area, angles, unit conversion, and triangle properties.

The practice bank contains 89 Bengali-first multiple-choice questions, including 64 newly added questions distributed across arithmetic, number sense, fractions, decimals, percentages, ratio, algebra, and geometry. Mixed practice selects up to 10 questions; the daily challenge selects five for the current date.

All listed lessons are available. Each lesson has an authored concept, worked example, at least three steps, a common-mistake note, hint, multiple-choice check, canonical answer, explanation, and takeaways.

## Content quality rules
- Keep core explanations in natural Bangladeshi Bengali; retain standard mathematical symbols where they help.
- Every question must have exactly one defensible correct option.
- The canonical answer must match one of the visible options.
- Worked examples must agree with the stated rule and units.
- Explain the reasoning, not only the answer.
- Avoid claiming mastery from completion alone; the check is a formative learning aid.
- Run the unit tests and production build before merging content changes.

## Current product limitations
Progress remains browser-local and is not synced across devices. The lesson checks are formative, not a grade-level placement test. Future content should add varied response formats (such as numeric entry and matching), expert review against the intended school curriculum, and more diagnostic feedback before introducing mastery gates.
