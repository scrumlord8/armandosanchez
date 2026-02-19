# ARMANDO_SIGNAL_BUILD_PLAN.md

## Structured Build Plan for Minimalist Branching Site

------------------------------------------------------------------------

# 1. Build Philosophy

Build in stages:

Stage 1: Layout and Spine\
Stage 2: Scroll Reveal\
Stage 3: Branch Interaction\
Stage 4: Overlay and Simulator\
Stage 5: Polish and Refinement

Each stage must function independently before moving forward.

------------------------------------------------------------------------

# 2. Tech Stack

Framework: Next.js 14 App Router\
Styling: TailwindCSS\
Animation: Framer Motion\
State: Lightweight local React state\
Optional: SVG animation for line branching

Avoid overengineering.

------------------------------------------------------------------------

# 3. Folder Structure

app/ layout.tsx page.tsx

components/ SpineLine.tsx IdentityReveal.tsx BranchSection.tsx
BranchLabel.tsx BranchContent.tsx ProjectOverlay.tsx
PressureSimulator.tsx

lib/ constants.ts utils.ts

------------------------------------------------------------------------

# 4. Stage 1 --- Layout and Spine

Tasks:

-   Create full-height landing section
-   Add vertical SpineLine component
-   Ensure responsive layout
-   Implement typography system

Prompt for Cursor:

Build the base single-page layout with a left-aligned vertical animated
spine line and centered name header.

Success Criteria:

-   Page renders cleanly
-   Spine visible and subtle
-   Typography correct

------------------------------------------------------------------------

# 5. Stage 2 --- Scroll Reveal

Tasks:

-   Implement scroll-triggered fade-in for identity lines
-   Animate spine extension on scroll
-   Ensure performance remains smooth

Prompt:

Add scroll-based reveal animations for identity text and animate the
spine extending downward progressively.

Success Criteria:

-   Smooth scroll transitions
-   No layout shift

------------------------------------------------------------------------

# 6. Stage 3 --- Branch Interaction

Tasks:

-   Create branch labels
-   Implement hover highlight logic
-   Allow one branch expansion at a time
-   Dim non-selected branches

Prompt:

Implement branch interaction so only one branch expands at a time. Other
branches should fade subtly.

Success Criteria:

-   Branch selection intuitive
-   Clean expansion behavior
-   No visual clutter

------------------------------------------------------------------------

# 7. Stage 4 --- Overlay and Simulator

Tasks:

-   Create ProjectOverlay component
-   Implement lightweight PressureSimulator sliders
-   Connect simulator output to reasoning text

Prompt:

Build a minimal overlay for project detail and a small prioritization
simulator with three sliders and dynamic reasoning output.

Success Criteria:

-   Overlay opens and closes cleanly
-   Simulator updates instantly
-   No excessive re-rendering

------------------------------------------------------------------------

# 8. Stage 5 --- Refinement

Tasks:

-   Adjust spacing
-   Refine motion timing
-   Ensure accessibility
-   Optimize Lighthouse score
-   Test mobile responsiveness

Prompt:

Refine spacing, timing, and accessibility. Remove unnecessary animation
and ensure high performance.

Success Criteria:

-   Smooth and calm experience
-   No console errors
-   Fully responsive

------------------------------------------------------------------------

# 9. Final Review Checklist

-   Typography consistent
-   No unnecessary colors
-   Branch logic stable
-   Overlay behaves correctly
-   Scroll behavior predictable
-   Performance acceptable

------------------------------------------------------------------------

# 10. Guiding Reminder

This version wins through discipline.

If it feels busy, simplify.

If it feels empty, add structure not decoration.
