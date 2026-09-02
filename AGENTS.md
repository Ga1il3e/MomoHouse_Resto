<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Treat the Figma file as a foundational reference, not a strict pixel lock; when layouts look off, uplift overall look and feel while keeping the brand system.
- Keep location/branch pages visually consistent with each other (e.g. Poissonnière should match the Montmartre page structure and design language).
- Keep Prettier configured and applied so Vercel builds do not fail on formatting.
- After meaningful site changes, push to the GitHub remote when asked (short requests like "push" / "update the github").

## Learned Workspace Facts

- Momo House is a Nepali/Tibetan street-food restaurant site for Paris branches Montmartre and Poissonnière.
- Design source: Figma file `KhBIasA1UfH3BuHtr4koSV` (Momo House).
- Git remote is `https://github.com/Ga1il3e/MomoHouse_Resto.git` (org `Ga1il3e`, repo `MomoHouse_Resto`).
- Stack is Next.js App Router + Tailwind; main routes include `/`, `/montmartre`, `/poissonniere`, `/carte`, `/montmartre/carte`, `/poissonniere/carte`, `/reservations`, and `/mentions-legales`.
- Homepage follows the newer Figma homepage frame; reservations are client-side form + confirmation only (no booking backend).
