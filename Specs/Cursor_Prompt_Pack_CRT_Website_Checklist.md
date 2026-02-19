# Cursor Prompt Pack – SF 80s Victorian CRT Website

This document is optimized to paste directly into Cursor as structured implementation guidance.
It removes conceptual fluff and focuses on execution clarity, constraints, and guardrails.

------------------------------------------------------------

# SECTION 1: MASTER STYLE GUARDRAIL (Paste into Cursor First)

Follow these rules strictly:

Project Goal:
Build a cinematic 1980s bedroom scene inside a San Francisco Victorian home at night.
The focal point is a woodgrain CRT television.
Only the TV screen content changes dynamically.

Style Constraints:
- Cinematic realism
- Warm tungsten interior lighting
- Cool blue moonlight through window
- No neon
- No cyberpunk
- No modern UI panels
- No glossy gradients
- No ultra-sharp imagery

Time Period:
Mid-to-late 1980s.

Materials:
- Brown fake wood veneer TV frame
- Plastic channel knobs
- Slight wear and aging
- Lace curtains
- Textured wallpaper
- Aged wood trim

TV Screen Behavior:
- Image rotates every 5 seconds
- Each transition includes:
    - 100–250ms static burst
    - Short static sound
- Images appear through CRT processing:
    - Slight blur
    - Scanlines
    - Noise
    - Vignette
    - Subtle RGB edge separation
    - Very subtle flicker

Header Text:
Stay tuned for future updates ...
Soft glow. Not modern UI typography.

------------------------------------------------------------

# SECTION 2: STEP-BY-STEP IMPLEMENTATION CHECKLIST

PHASE 1 — Static Scene Layout

[ ] Full viewport background using bedroom-night image
[ ] Center CRT TV frame element
[ ] Create .tv-screen container with correct aspect ratio
[ ] Ensure no layout shift when images load

Acceptance Criteria:
- Room feels cinematic and warm
- TV is the visual focal point
- Nothing moves yet

------------------------------------------------------------

PHASE 2 — Image Rotation Engine

[ ] Load images from /assets/personal_crt/
[ ] Preload next image to avoid flicker
[ ] Rotate every 5000ms
[ ] Loop back to first image

Acceptance Criteria:
- No blank frames
- No DOM reflow
- Clean cycling

------------------------------------------------------------

PHASE 3 — Static Transition + Audio

[ ] On image change:
    - Trigger static overlay
    - Play random static sound
    - After 150ms swap image
    - Fade static out

Acceptance Criteria:
- Feels like analog channel switch
- Sound is subtle, not aggressive
- Transition is quick and nostalgic

------------------------------------------------------------

PHASE 4 — CRT EFFECT STACK

Structure:

.tv
  .tv-frame
  .tv-screen
    img.current
    .fx-scanlines
    .fx-noise
    .fx-vignette
    .fx-static

Effects:

[ ] Slight blur on base image
[ ] Overlay repeating horizontal scanlines
[ ] Add subtle animated noise layer
[ ] Add soft vignette
[ ] Add mild RGB separation (2px max)
[ ] Add subtle opacity flicker (1–2% variation)

Acceptance Criteria:
- Screen never looks HD crisp
- Feels like real CRT glass
- Effects are subtle, not gimmicky

------------------------------------------------------------

PHASE 5 — Typography

[ ] Add header text at top
[ ] Apply soft glow using text-shadow
[ ] Slight warm tint

Acceptance Criteria:
- Text blends into scene
- Does not look like a modern web app header

------------------------------------------------------------

# SECTION 3: OPTIONAL ADVANCED POLISH

Future Enhancements:

[ ] Add subtle ambient room audio
[ ] Add soft animated lamp flicker
[ ] Add time-of-day scene transitions (morning, dusk)
[ ] Add faint screen curvature distortion via canvas or shader

------------------------------------------------------------

# SECTION 4: DO NOT ALLOW CURSOR TO DO

- Add glassmorphism
- Add Tailwind UI panels
- Add neon gradients
- Add synthwave grids
- Over-sharpen images
- Use modern minimal white design

------------------------------------------------------------

End of Cursor Prompt Pack
