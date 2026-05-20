# Gabriel Demargne

Professional services website for Gabriel Demargne, built with Next.js and intended for deployment on Vercel.

## Overview

This repository is the standalone rebuild of `gabrieldemargne.com`, replacing the current Cargo-driven site with a maintainable Next.js application.

The site is structured around a service-led presentation of:

- website design
- UX / UI consulting
- UX research
- photography
- small-business consulting

## Stack

- Next.js `app/` router
- TypeScript
- React
- ESLint
- Vercel

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

```text
src/app                App routes
src/components         Shared and route-specific UI components
src/data/site.ts       Site navigation and service content
public/                Static assets and photography selections
```

## Content workflow

The implementation lives in this repository, but the working copy source of truth is maintained in the Obsidian project notes.

- Approved copy: `Build/Projects/MyWebsite/Copy/Copy.md`
- Exploratory copy: `Build/Projects/MyWebsite/Copy/Copy Ideas.md`

When a route is added, removed, renamed, or materially edited, update the approved copy notes so the implementation and planning stay aligned.

## Deployment

This project is intended for Vercel deployment.

Expected defaults:

- Framework preset: `Next.js`
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm run start`

## Status

- The current live site is still Cargo-driven.
- This repository is the migration target.
- A clean local snapshot of the first Git milestone exists as tag `V1`.
