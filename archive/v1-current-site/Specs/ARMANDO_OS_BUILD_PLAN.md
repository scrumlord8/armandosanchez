# ARMANDO_OS_BUILD_PLAN.md

## Structured Implementation Plan for ArmandoOS

------------------------------------------------------------------------

# 1. Build Philosophy

Do not build everything at once.

Build in layers:

Layer 1: Structure\
Layer 2: State\
Layer 3: Interactions\
Layer 4: Gamification\
Layer 5: Polish

Each layer should compile and run before moving forward.

------------------------------------------------------------------------

# 2. Tech Stack Decisions

Framework: Next.js 14 (App Router)\
Styling: TailwindCSS\
Animation: Framer Motion\
State: Zustand\
Optional Visual Layer: Three.js (only after foundation is stable)\
Deployment: Vercel

------------------------------------------------------------------------

# 3. Folder Structure (Target Architecture)

app/ layout.tsx page.tsx systems/page.tsx projects/page.tsx
field-ops/page.tsx lab/page.tsx signal/page.tsx loyalty/page.tsx
origin/page.tsx

components/ AppShell.tsx StarfieldBackground.tsx GridOverlay.tsx
MissionControlHub.tsx ModuleNode.tsx InsightMeter.tsx XPToast.tsx

store/ xpStore.ts

lib/ constants.ts utils.ts

------------------------------------------------------------------------

# 4. Phase-by-Phase Build Plan

## Phase 1 --- Foundation

Goal: Scaffold the app and create visual shell.

Tasks: - Initialize Next.js + Tailwind - Create AppShell layout -
Implement StarfieldBackground placeholder - Build MissionControlHub with
static ModuleNodes - Implement routing for all module pages - Basic
transitions between pages

Cursor Prompt to Use: "Build Phase 1 from the PRD. Scaffold the
application structure and create placeholder content for each module
route. Do not implement XP logic yet."

Success Criteria: - Homepage loads - Modules clickable - Pages render
without errors

------------------------------------------------------------------------

## Phase 2 --- XP State System

Goal: Implement gamification logic without polish.

Tasks: - Create Zustand store for XP - Add InsightMeter component -
Define XP event triggers - Add localStorage persistence - Add simple
XPToast notification

Cursor Prompt: "Implement the XP state model according to the PRD.
Connect XP events to module opens. Persist state in localStorage. Keep
implementation minimal."

Success Criteria: - XP increases correctly - Progress bar updates -
Refresh retains state

------------------------------------------------------------------------

## Phase 3 --- Systems Interactive Graph

Goal: Add real interactivity to Systems module.

Tasks: - Create node graph layout - Expandable content panels -
Completion trigger when 3 nodes explored

Cursor Prompt: "Implement the Systems interactive node map. Nodes should
expand and dim others when selected. Trigger completion state after 3
nodes are opened."

Success Criteria: - Nodes animate smoothly - Completion adds XP - No
performance lag

------------------------------------------------------------------------

## Phase 4 --- Projects Toggle View

Goal: Demonstrate PM vs Engineering dual perspective.

Tasks: - Build project card component - Implement toggle state per
project - Swap content dynamically

Cursor Prompt: "Implement the PM View and Engineering View toggle inside
the Projects module. Swap content sections without reloading the page."

Success Criteria: - Toggle works cleanly - State remains consistent

------------------------------------------------------------------------

## Phase 5 --- Field Ops Simulator

Goal: Build the flagship credibility feature.

Tasks: - Create ranking interface for 5 initiatives - Capture user
ranking - Display Armando ranking comparison - Award XP upon completion

Cursor Prompt: "Implement the TPM prioritization simulator as an
isolated component inside Field Ops. Include ranking interaction and
explanation reveal."

Success Criteria: - Ranking logic works - Comparison renders clearly -
XP awarded once

------------------------------------------------------------------------

## Phase 6 --- Personal Layers

Goal: Add personality without clutter.

Tasks: - Loyalty trading cards flip animation - Signal accent theme
toggle - Origin constellation hover states

Cursor Prompt: "Implement Loyalty card flip animation and Signal accent
toggle. Keep transitions subtle and performance optimized."

Success Criteria: - Animations smooth - Accent theme updates globally -
No layout shift

------------------------------------------------------------------------

## Phase 7 --- Operator Mode Unlock

Goal: Reward exploration.

Tasks: - Unlock toggle at 100 percent - Alternate UI theme - Reveal
Executive Brief button

Cursor Prompt: "Implement Operator Mode unlock when XP reaches 100
percent. Enable alternate theme and reveal hidden executive summary
section."

Success Criteria: - Unlock triggers correctly - Theme changes globally -
No regressions in layout

------------------------------------------------------------------------

# 5. Performance Safeguards

-   Lazy load heavy modules
-   Avoid large animation loops
-   Avoid blocking state updates
-   Optimize Framer Motion transitions

------------------------------------------------------------------------

# 6. Final Pre-Launch Checklist

-   Mobile responsiveness
-   Lighthouse performance audit
-   Accessibility pass
-   Remove console logs
-   Confirm XP persistence
-   Confirm no broken routes

------------------------------------------------------------------------

# 7. Optional Phase 2 Enhancements

-   Add subtle sound design
-   Add AI chatbot trained on leadership philosophy
-   Add analytics tracking
-   Add public changelog section

------------------------------------------------------------------------

# 8. Guiding Principle

The site should feel intentional, not noisy.

If something feels clever but distracting, remove it.

The goal is to communicate depth and control.
