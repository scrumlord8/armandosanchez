# Armando OS Archive Snapshot (v1-current-site)

Snapshot date: 2026-02-19

## Included
- `app/`
- `components/`
- `lib/`
- `stores/`
- `Specs/`
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`

## Excluded
- `.next/`
- `node_modules/`
- `tsconfig.tsbuildinfo`
- Any other local caches/build outputs

## Restore Options
1. Restore from this source snapshot in-place:
   - From repo root, copy files back:
   - `cp -R archive/v1-current-site/app ./`
   - `cp -R archive/v1-current-site/components ./`
   - `cp -R archive/v1-current-site/lib ./`
   - `cp -R archive/v1-current-site/stores ./`
   - `cp -R archive/v1-current-site/Specs ./`
   - `cp archive/v1-current-site/package.json ./`
   - `cp archive/v1-current-site/package-lock.json ./`
   - `cp archive/v1-current-site/next.config.mjs ./`
   - `cp archive/v1-current-site/tailwind.config.ts ./`
   - `cp archive/v1-current-site/tsconfig.json ./`
   - `cp archive/v1-current-site/postcss.config.mjs ./`
2. Restore via git history:
   - Check out the commit that contains this snapshot, or a commit before the retro TV cutover.
