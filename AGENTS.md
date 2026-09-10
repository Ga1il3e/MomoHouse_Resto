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
- Homepage is a brand portal whose job is choosing a house; keep full menus, hours, booking, and order flows on house pages, not the portal.
- Never present unverified `[VERIFY]` facts (phones, hours, ratings, postcodes, walking time) as truth in copy or structured data; leave TODOs until confirmed.
- Prefer authentic food photography over 3D dumpling assets, stock, or AI-generated imagery for hero visuals.
- Label menu/order navigation and pages as "Commandes" (not "Voir la carte").
- For Montmartre, never use Sacré-Cœur / hill / Butte imagery or wording, and never link to momo-house-montmartre.fr.

## Learned Workspace Facts

- Momo House is a Nepalese/Tibetan dumpling brand with Paris houses Montmartre and Poissonnière.
- Design source: Figma file `KhBIasA1UfH3BuHtr4koSV` (Momo House).
- Git remote is `https://github.com/Ga1il3e/MomoHouse_Resto.git` (org `Ga1il3e`, repo `MomoHouse_Resto`).
- Current codebase is the Rocket `momohouse` tree: Next.js 15 App Router + Tailwind 3; local `npm run dev` uses port **4028**.
- i18n is client-side via `LanguageContext` / `src/lib/i18n.ts` (not next-intl / no `/en` locale routes).
- Brand portal: `/`. Dedicated house sites: `/montmartre` and `/poissonniere`, each with `/carte`, `/a-propos`, `/contact`, `/panier`. Legal: `/mentions-legales`, `/confidentialite`, `/cgv`.
- House/menu facts live in `src/data/locations.ts` and `src/data/menu.ts` (menu prices still TODO until owner-confirmed).
- Montmartre is at 85 Rue Montmartre, 75002 (Sentier/Montorgueil), not the Montmartre hill in the 18th; Poissonnière is at 46 Rue Poissonnière (postcode still unverified).
- Supabase credentials for the existing project live only in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`); there is no in-app Supabase client yet. Never commit `.env` / `.env.local`.
- Inquiry/cart flows are client-side UI only (no booking/order backend wired yet).
