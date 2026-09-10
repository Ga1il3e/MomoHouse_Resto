# Momo House — Two House Sites

**Phase 1 complete.** This README covers setup, Phase 1 deliverables, the VERIFY list, the shot list, and dependency justifications.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Routes

### Portal (root)
| Route | Page |
|---|---|
| `/` | Momo House portal (brand landing) |
| `/montmartre` | Montmartre house home |
| `/poissonniere` | Poissonnière house home |
| `/mentions-legales` | Legal notice (shared) |
| `/cgv` | Terms of sale (shared) |
| `/confidentialite` | Privacy policy (shared) |

### Per-house routes (both houses share the same components)
| Route | Page |
|---|---|
| `/{house}` | House home — arrival, signature dishes, room |
| `/{house}/carte` | Menu — browse, filter, add to cart |
| `/{house}/a-propos` | About — editorial chapters |
| `/{house}/contact` | Contact — address, hours, map |
| `/{house}/panier` | Cart — order, pickup time, pay |

---

## Phase 1 Deliverables

### Ordering Model Recommendation

**Recommended: Model A — Click & collect, paid online (Stripe Checkout)**

| Model | Recommendation |
|---|---|
| A. Click & collect, paid online | ✅ **Recommended** — best customer experience, reduces no-shows, Stripe hosted checkout means card data never touches our servers |
| B. Click & collect, pay at pickup | Acceptable fallback if owner is not ready for online payments |
| C. Hand-off to existing platform | Only if owner explicitly wants to keep the Uniiti/usellweb shop [VERIFY] |

The checkout adapter is in `src/app/components/CartPage.tsx` and will move to `packages/commerce/checkout/` in Phase 3. Switching models will not touch the UI.

**Order delivery to restaurant:** Owner to choose in Phase 1 review:
- Email with clear ticket layout (simplest)
- Password-protected order screen for a tablet
- Receipt printer integration

### Menu-Editing Option Recommendation

**Recommended: Option A — Headless CMS (Sanity or Payload)**

| Option | Recommendation |
|---|---|
| A. Headless CMS | ✅ **Recommended** — owner can change prices, mark sold out, edit hours without a developer. ISR revalidation means changes appear within ~1 minute. |
| B. Google Sheet synced at build | Acceptable if owner prefers spreadsheets. Needs on-demand revalidation webhook. |
| C. Typed files in repo | Only if owner explicitly accepts developer involvement for every change. |

Currently: menu data lives in `src/data/menu.ts`. All dishes are marked `sampleOnly: true` and prices are `0` (displayed as `—`). Real menu to be provided by owner.

### Per-House Differentiation Plan

Both houses share one design system. They differ in exactly three places:

| Dimension | Montmartre | Poissonnière |
|---|---|---|
| **Photo treatment** | Warmer, grainier — candlelit, intimate | Crisper, brighter — urban, contemporary |
| **Voice of captions** | Quieter, more contemplative | More direct, street-energy |
| **Typographic detail** | House name set tighter, more compressed | House name set with more tracking |

**One structural divergence:** Montmartre home leads with *Order* (primary CTA), Poissonnière leads with *Visit*. This reflects the brief's instruction and will be grounded in real confirmed differences gathered from the owner in Phase 1 review.

> ⚠ These are provisional. Final differentiation must be based on real, confirmed differences (room size, menu specialities, service style) gathered from the owner interview.

### Wireframe Descriptions

#### House Home — 360px
1. **Arrival** (full viewport): House name large (fills width), address + live status below, two stacked CTAs (Order / Visit)
2. **Signature** (2 dishes): Full-width image placeholder, Devanagari name large, Latin gloss small, ingredient fragments, price, Add button
3. **Room**: Full-width image placeholder, one line of copy, links to About and Contact
4. **Footer strip**: Hours summary, sister house link, portal link, legal links

#### House Home — 1440px
1. **Arrival**: House name at ~12rem, address left-aligned, CTAs right-aligned, both on one row
2. **Signature**: 2-column grid, each dish in its own column with image above text
3. **Room**: Full-width image, copy and links in a row below
4. **Footer strip**: Single row with hours / sister house / portal / legal

#### Menu — 360px
- Sticky category bar: horizontal scroll, full width
- Filter chips: single scrollable row below category bar
- Dish rows: full width, name + description left, price + Add right
- Dish sheet: slides up from bottom, full width, 85vh max

#### Menu — 1440px
- Category bar: left-aligned, no scroll needed
- Filter chips: same row as category bar or just below
- Dish rows: max-width 4xl, centered, more breathing room
- Dish sheet: centered modal, max-width lg

#### About — 360px
- Opening statement: full width, large display type
- Chapters: stacked — image full width, text below
- Closing links: stacked buttons

#### About — 1440px
- Opening statement: max 14ch, left-aligned
- Chapters: alternating 5/7 and 7/5 column splits
- Closing links: side by side

#### Contact — 360px
- Address and phone above the fold, both tap targets
- Live status + today's hours
- 7-day hours block below
- Map placeholder with Open in Maps link
- Getting there section

#### Contact — 1440px
- 2-column grid: address/phone left, status/reservations right
- Hours block full width below
- Map full width
- Getting there 2-column

#### Cart — 360px
- Single column, full width
- Line items list
- Note field
- Pickup slot selector
- Customer details (stacked inputs)
- Totals
- Allergen notice + checkbox
- Place order button (sticky at bottom on mobile)

#### Cart — 1440px
- Max-width 2xl, centered
- Same single-column layout (cart is always a focused task)

### About Interview Questions

1. Who cooks — is it a family kitchen, or do you have a team?
2. Where does your family come from, and how did you end up in Paris?
3. What is the dish regulars always order?
4. What makes this room different from the sister house?
5. What do Nepali customers say about the food?
6. How did you learn to fold momos — who taught you?
7. What does a typical morning look like before service?
8. Is there a dish on the menu that means something personal to you?
9. What ingredients do you source specially, and where from?
10. What would you want a first-time customer to know before they sit down?
11. How has the neighbourhood changed since you opened?
12. What is the one thing you would never change about this place?

---

## VERIFY List

### Owner to confirm
- [ ] Montmartre phone: +33 9 77 48 77 25
- [ ] Montmartre hours (all days)
- [ ] Poissonnière hours (all days)
- [ ] Poissonnière postcode: 75010 or 75002?
- [ ] Montmartre nearest metro station(s)
- [ ] Poissonnière nearest metro station(s)
- [ ] Walking time between the two houses
- [ ] Montmartre Instagram handle
- [ ] Poissonnière Instagram handle (@momohouse74?)
- [ ] Montmartre email
- [ ] Poissonnière email
- [ ] Current ordering platform for Poissonnière (Uniiti/usellweb — does it stay?)
- [ ] Which momo styles exist per house (steamed / fried / jhol / chilli)
- [ ] Full menu for both houses (all dishes, prices, allergens)
- [ ] Minimum preparation time for pickup (placeholder: 20 min)
- [ ] Per-slot capacity
- [ ] Whether pre-ordering (next day) is enabled
- [ ] Whether a contact form is wanted (group bookings / events)
- [ ] Ordering model choice: A (Stripe), B (pay at pickup), or C (hand-off)
- [ ] Menu-editing option: CMS, Google Sheet, or files
- [ ] How orders should reach the restaurant (email / tablet screen / printer)
- [ ] Whether VAT line should be shown in cart
- [ ] Delivery platforms (if any)
- [ ] Whether "Fait maison" label applies to any dish
- [ ] One-line note for menu header (e.g. "Everything folded by hand") — verify before using
- [ ] `--momo-red` exact hex from real logo/signage (placeholder: #C41E2A / current: #C8102E)
- [ ] Real domain for Montmartre house (momo-house-montmartre.fr currently serves unrelated content — never link to it)
- [ ] Whether momo-house.fr will point to the new Poissonnière site (plan 301 redirects)

### Accountant / lawyer to confirm
- [ ] VAT rates applicable to online food sales
- [ ] Whether 14-day withdrawal right applies (perishable food exception — Article L221-28)
- [ ] CGV wording (currently DRAFT)
- [ ] Mentions légales wording (currently DRAFT)
- [ ] Alcohol licence and age-verification process (if alcoholic drinks are sold online)

### Photographer
- [ ] Facade and sign — both houses
- [ ] Room, wide shot — both houses
- [ ] Room detail — both houses
- [ ] Lanterns — both houses
- [ ] Hands pleating momo dough — both houses
- [ ] Every signature dish (45°, bowl edge in frame, 4:5)
- [ ] Staff portraits — only with explicit written consent

### Native Nepali reader
- [ ] Verify all Devanagari dish name strings (currently all marked `verified: false`)
- [ ] Confirm line-height ≥ 1.4 renders correctly for all Devanagari text

---

## Shot List

### Both Houses
- Facade and sign (exterior, daytime)
- Room, wide establishing shot (16:9 or 16:7)
- Room detail (lanterns, table setting, textures)
- Hands pleating momo dough (close-up, warm light, 4:5)
- Every signature dish (45°, bowl edge in frame, 4:5)
- Staff portraits (with explicit written consent)

### Montmartre Specific
- Candlelit interior, warm amber tones
- Corner table for two

### Poissonnière Specific
- Contemporary interior, urban energy
- Communal table, lively service

---

## Architecture

```
src/
  app/
    page.tsx                    Portal home
    layout.tsx                  Root layout (LanguageProvider)
    montmartre/
      page.tsx                  House home → HouseHome
      carte/page.tsx            Menu → MenuPage
      a-propos/page.tsx         About → AboutPage
      contact/page.tsx          Contact → ContactPage
      panier/page.tsx           Cart → CartPage
    poissonniere/
      page.tsx                  House home → HouseHome
      carte/page.tsx            Menu → MenuPage
      a-propos/page.tsx         About → AboutPage
      contact/page.tsx          Contact → ContactPage
      panier/page.tsx           Cart → CartPage
    mentions-legales/page.tsx   Legal notice (shared)
    cgv/page.tsx                Terms of sale (shared)
    confidentialite/page.tsx    Privacy policy (shared)
    components/
      HouseHome.tsx             Arrival + Signature + Room
      MenuPage.tsx              Full menu with filters
      AboutPage.tsx             Editorial chapters
      ContactPage.tsx           Address, hours, map
      CartPage.tsx              Order, pickup, pay
      HousePage.tsx             Legacy house detail page
      Navbar.tsx
      ...
  data/
    locations.ts                House addresses, phones
    menu.ts                     Dish schema + sample menus
  lib/
    i18n.ts                     FR/EN translations
  context/
    LanguageContext.tsx
  components/
    Footer.tsx
```

---

## Dependency Justifications

| Package | Justification |
|---|---|
| `next` | Framework — App Router, ISR, image optimisation |
| `react` / `react-dom` | UI library |
| `typescript` | Type safety — required for dish schema, allergen types, cart state |
| `tailwindcss` | Layout utilities; all colours via CSS variables |
| `@tailwindcss/typography` | Prose styles for legal pages |
| `@heroicons/react` | Icon set consistent with existing codebase |
| `recharts` | Not yet used; available for future analytics |
| `plus-jakarta-sans` (Google Fonts) | Brand typeface — already in use |

**Phase 3 additions (not yet installed):**
- `stripe` (server-only) — Stripe SDK for Model A checkout
- CMS client (Sanity or Payload) — for menu editing
- `zod` — shared validation for cart and contact forms

---

## Legal Pages Status

All three legal pages (`/mentions-legales`, `/cgv`, `/confidentialite`) are marked **DRAFT** and must be reviewed by a qualified professional before the site goes live. Do not present them as legally checked.

---

## What's Next (Phase 2)

- Replace all `[VERIFY]` placeholders with confirmed data from owner
- Replace sample menu with real dishes, prices, and allergens
- Add real photography (remove all PLACEHOLDER frames)
- Implement `getStatus(house, now)` with confirmed hours
- Add dynamic pickup slot picker
- Connect menu to CMS (once option is chosen)
- Add `next-intl` for proper FR/EN routing (`/en/menu`, `/en/about`, etc.)
- Add JSON-LD structured data per house
- Add `hreflang` and canonical URLs