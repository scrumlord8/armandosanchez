# ARMANDO_SIGNAL_PRD.md

## Minimalist Single-Page Branching Identity Experience

------------------------------------------------------------------------

# 1. Product Vision

Create a single-page, hard-dark, minimalist website that unfolds
progressively through scroll and branch interaction.

The goal is not to gamify or entertain. The goal is to demonstrate
clarity, structure, and depth.

Visitors should think: "Wow, this guy builds cool stuff."

The experience should feel intentional, cinematic, and controlled.

------------------------------------------------------------------------

# 2. Core Experience

This is a single scrollable page with one central visual motif:

A thin vertical line that acts as the structural spine of the site.

As the user scrolls: - Identity is revealed progressively. - The line
extends. - The line branches. - Each branch expands into structured
content.

There is no traditional navigation bar.

------------------------------------------------------------------------

# 3. Design Principles

-   Hard near-black background
-   Soft white typography
-   Generous whitespace
-   Thin animated line system
-   Subtle motion only
-   No heavy UI components
-   No cards or dashboards

Restraint is the differentiator.

------------------------------------------------------------------------

# 4. Page Architecture

## Section 1: Opening Frame

Full viewport height.

Centered: Armando \[Last Name\]

Nothing else.

A faint vertical line appears along the left margin.

------------------------------------------------------------------------

## Section 2: Identity Reveal

Scroll-triggered fade-ins:

Senior Technical Program Manager\
AI Builder\
Systems Thinker

Then:

"I design clarity inside complex systems."

------------------------------------------------------------------------

## Section 3: Branch Moment

The vertical line extends and splits into branches labeled:

Work\
AI\
Projects\
Pressure\
Personal

Hover: Branch brightens.

Click: Selected branch expands into a vertical narrative. Other branches
fade.

Only one branch active at a time.

------------------------------------------------------------------------

# 5. Branch Content Structure

Each branch contains:

-   Large header
-   Short introductory paragraph
-   Structured sub-sections
-   Expandable detail panels

No heavy containers. Minimal separation using whitespace and thin
dividers.

------------------------------------------------------------------------

## Work Branch

Focus: Leadership, roadmap design, capacity modeling, execution systems.

------------------------------------------------------------------------

## AI Branch

Focus: Tools built, experimentation, agentic workflows, technical
curiosity.

------------------------------------------------------------------------

## Projects Branch

Focus: Selected builds with expandable detail overlay.

------------------------------------------------------------------------

## Pressure Branch

Focus: Decision-making under stress.

Includes small interactive slider component to simulate prioritization
logic.

------------------------------------------------------------------------

## Personal Branch

Focus: Family, Giants, 49ers, music, entrepreneurship.

Short reflections only.

------------------------------------------------------------------------

# 6. Interaction Model

State Model:

-   currentBranch
-   branchExpanded boolean
-   overlayActive boolean
-   simulatorState

Only one major interaction active at a time.

------------------------------------------------------------------------

# 7. Motion System

Allowed:

-   Fade in
-   Line draw animation
-   Subtle scale transitions
-   Smooth content expansion

Not allowed:

-   Bounce effects
-   Parallax overload
-   Loud animations

------------------------------------------------------------------------

# 8. Performance Goals

-   Fast first paint
-   Minimal JavaScript
-   Lightweight animation logic
-   Accessible interactions

------------------------------------------------------------------------

# 9. Success Criteria

Visitors should:

-   Scroll through full experience
-   Expand at least one branch
-   Open at least one project detail
-   Leave with clear understanding of leadership depth and technical
    capability

------------------------------------------------------------------------

# 10. Guiding Principle

If something feels decorative rather than structural, remove it.

The power of this version comes from reduction.
