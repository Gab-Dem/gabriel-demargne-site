# Gabriel Demargne

Standalone rebuild of `gabrieldemargne.com` outside Cargo, using Next.js and intended for deployment on Vercel.

## Stack

- Next.js `app/` router
- TypeScript
- ESLint
- Vercel for hosting

## Current status

The repo is in active design and implementation iteration around a split-layout services site.

- Local Next.js build is working
- Visual direction is being refined in-browser
- Project notes live in Obsidian under `Build/Projects/MyWebsite`
- Copy is managed in Obsidian rather than directly in implementation notes

## Development

Install dependencies if needed, then start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Copy workflow

The website copy source of truth is:

- `Build/Projects/MyWebsite/Copy` in the Obsidian vault

Use:

- `Copy.md` for approved live copy
- `Copy Ideas.md` for experiments and alternates

Rule:

- When a route is added, removed, renamed, or materially edited, update `Copy.md` so the project notes remain aligned with the website.

## Vercel

Once the repo is on GitHub:

1. Create a new Vercel project from the repo.
2. Framework preset: `Next.js`.
3. Build command: `npm run build`.
4. Output setting: default Next.js output.
5. Add the production domain after the first deploy.

## Notes

- The current live site is still Cargo-driven.
- This repo is the migration target, not a Cargo export.
