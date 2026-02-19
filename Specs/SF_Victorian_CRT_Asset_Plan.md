# SF Victorian 80s Bedroom CRT Website – Asset & Build Plan

Absolutely. Here’s a Cursor-friendly plan + asset list + implementation recipe that will keep the aesthetic consistent and make it much easier for Cursor to stay inside the vibe you want.

---

## 1) What you’re actually building

North Star: A single hero scene: nighttime 80s bedroom inside an SF Victorian, with a woodgrain CRT TV as the focal point. The TV cycles personal images every 5 seconds, each image rendered as played through an old CRT. Between images: a brief static flash plus static sound.

Rule: Everything is realistic, cinematic, warm tungsten lighting with period-accurate props. The TV screen is the only dynamic content.

---

## 2) Repo asset checklist

### A) Background scene assets

Option 1 (Fastest, most consistent): One large background image  
- assets/scene/bedroom-night.png or .webp  

Optional layers:
- assets/scene/bedroom-night_foreground.png  
- assets/scene/bedroom-night_windowglow.png  

Option 2 (More composable):
- assets/scene/wallpaper.png  
- assets/props/tv_shell.png  
- assets/props/tv_glass_overlay.png  
- assets/props/lamp_glow.png  

---

### B) CRT effect assets
- assets/fx/scanlines.png  
- assets/fx/noise.png  
- assets/fx/vignette.png  
- assets/fx/static_frames/0001.png..0010.png  

---

### C) Audio
- assets/audio/static_tick_01.mp3  
- assets/audio/static_tick_02.mp3  
- assets/audio/room_ambience_night.mp3  

---

### D) Personal image flow
- assets/personal_raw/  
- assets/personal_crt/  

---

## 3) ART_DIRECTION.md

Core vibe:
- Cinematic realism, warm tungsten lamplight, cozy but slightly moody
- Old San Francisco Victorian interior details
- Mid-to-late 1980s
- Woodgrain CRT TV is the hero object
- Background is static

Color + lighting:
- Warm amber interior, cool blue moonlight outside
- Moderate contrast, gentle film grain
- No neon cyberpunk

Materials:
- Brown fake wood veneer CRT
- Plastic knobs
- Textured wallpaper, aged trim

TV behavior:
- Every 5 seconds new image
- Brief static burst + sound
- Slight blur, scanlines, chromatic aberration
- Vignette, mild barrel distortion
- Subtle flicker

Typography:
Header: Stay tuned for future updates ...
Soft glow, not modern UI

---

## 4) Image pre-processing pipeline

Recommended: Pre-process images before runtime for consistency.

ImageMagick example:

```bash
#!/usr/bin/env bash
set -euo pipefail

IN_DIR="assets/personal_raw"
OUT_DIR="assets/personal_crt"
mkdir -p "$OUT_DIR"

BLUR="0x0.6"
GAMMA="1.05"
RESIZE="960x720^"

for f in "$IN_DIR"/*; do
  [ -f "$f" ] || continue
  base="$(basename "$f")"
  out="$OUT_DIR/${base%.*}.jpg"

  magick "$f"     -auto-orient     -resize "$RESIZE" -gravity center -extent 960x720     -gamma "$GAMMA"     -blur "$BLUR"     -attenuate 0.12 +noise Gaussian     -quality 86     "$out"
done
```

---

## 5) Cursor task phases

Phase 1: Static scene + TV frame  
Phase 2: Image rotation logic (5 sec loop)  
Phase 3: Static transition + sound  
Phase 4: CRT effects overlay  
Phase 5: Header glow styling  

---

## 6) CRT CSS layering concept

.tv  
  .tv-frame  
  .tv-screen  
    img.current  
    .fx-scanlines  
    .fx-noise  
    .fx-vignette  
    .fx-static  

---

## 7) Asset generation prompts

Bedroom background:
“1980s bedroom inside an old San Francisco Victorian home at night, warm tungsten lamp light, lace curtains, tall window with distant SF night lights, cozy cinematic realism, subtle film grain, no modern objects, wood trim and molding, centered composition with space for a vintage woodgrain CRT television, realistic, high detail, moody warm interior and cool exterior light balance”

TV frame:
“front-facing mid-to-late 1980s woodgrain CRT television frame, fake brown wood veneer, plastic knobs for channel and volume, speaker grille, subtle wear, realistic, isolated object, transparent background, centered, high resolution”

Glass overlay:
“subtle CRT glass reflection overlay, soft highlights, faint smudges, vignette at corners, transparent background”
