// TODO: All prices shown as 0 (displayed as —) until confirmed by owner
// TODO: Verify which momo styles exist per house (steamed/fried/jhol/chilli)
// TODO: Verify allergens per dish with owner
// TODO: Replace sample dishes with real menu from owner

export type Allergen =
  | 'gluten' | 'crustaceans' | 'eggs' | 'fish' | 'peanuts' |'soy'| 'milk' | 'nuts' | 'celery' | 'mustard' |'sesame' | 'sulphites' | 'lupin' | 'molluscs';

export const ALLERGEN_LABELS: Record<Allergen, { fr: string; en: string; abbr: string }> = {
  gluten:      { fr: 'Gluten', en: 'Gluten', abbr: 'GL' },
  crustaceans: { fr: 'Crustacés', en: 'Crustaceans', abbr: 'CR' },
  eggs:        { fr: 'Œufs', en: 'Eggs', abbr: 'EG' },
  fish:        { fr: 'Poisson', en: 'Fish', abbr: 'FI' },
  peanuts:     { fr: 'Arachides', en: 'Peanuts', abbr: 'PN' },
  soy:         { fr: 'Soja', en: 'Soy', abbr: 'SO' },
  milk:        { fr: 'Lait', en: 'Milk', abbr: 'MI' },
  nuts:        { fr: 'Fruits à coque', en: 'Tree nuts', abbr: 'NU' },
  celery:      { fr: 'Céleri', en: 'Celery', abbr: 'CE' },
  mustard:     { fr: 'Moutarde', en: 'Mustard', abbr: 'MU' },
  sesame:      { fr: 'Sésame', en: 'Sesame', abbr: 'SE' },
  sulphites:   { fr: 'Sulfites', en: 'Sulphites', abbr: 'SU' },
  lupin:       { fr: 'Lupin', en: 'Lupin', abbr: 'LU' },
  molluscs:    { fr: 'Mollusques', en: 'Molluscs', abbr: 'MO' },
};

export interface DishVariant {
  id: string;
  label: { fr: string; en: string };
  priceDelta: number; // cents
}

export interface DishOption {
  id: string;
  label: { fr: string; en: string };
  choices: { id: string; label: { fr: string; en: string } }[];
  required: boolean;
  max: number;
}

export interface Dish {
  id: string;
  slug: string;
  category: string;
  name: { fr: string; en: string };
  nameNe?: { text: string; verified: boolean };
  description: { fr: string; en: string };
  price: number; // cents, TTC — 0 = unconfirmed (display as —)
  variants?: DishVariant[];
  options?: DishOption[];
  allergens: Allergen[];
  diet: ('vegetarian' | 'vegan')[];
  spice: 0 | 1 | 2 | 3;
  available: boolean;
  orderable: boolean;
  image?: string;
  signature?: boolean;
  sampleOnly?: boolean; // true = placeholder, price unconfirmed
}

// ─── MOMO STYLES (shared variants) ──────────────────────────────────────────
// TODO: Verify which styles exist per house with owner
const momoStyleVariants: DishVariant[] = [
  { id: 'steamed', label: { fr: 'Vapeur', en: 'Steamed' }, priceDelta: 0 },
  { id: 'fried',   label: { fr: 'Frit', en: 'Fried' },     priceDelta: 100 },
  { id: 'jhol',    label: { fr: 'Jhol', en: 'Jhol' },       priceDelta: 150 },
  { id: 'chilli',  label: { fr: 'Chilli', en: 'Chilli' },   priceDelta: 100 },
];

// ─── MONTMARTRE MENU ─────────────────────────────────────────────────────────
export const montmartreMenu: Dish[] = [
  // MOMOS
  {
    id: 'mnm-buff-momo',
    slug: 'buff-momo',
    category: 'momos',
    name: { fr: 'Momo Buffle', en: 'Buff Momo' },
    nameNe: { text: 'बफ मम:', verified: false },
    description: {
      fr: 'Buffle d\'eau · Gingembre · Coriandre · Pâte fine main',
      en: 'Water buffalo · Ginger · Coriander · Hand-rolled skin',
    },
    price: 0, // TODO: confirm price
    variants: momoStyleVariants,
    allergens: ['gluten'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    signature: true,
    sampleOnly: true,
  },
  {
    id: 'mnm-chicken-momo',
    slug: 'chicken-momo',
    category: 'momos',
    name: { fr: 'Momo Poulet', en: 'Chicken Momo' },
    nameNe: { text: 'चिकन मम:', verified: false },
    description: {
      fr: 'Poulet · Ail · Ciboulette · Achar sésame-tomate',
      en: 'Chicken · Garlic · Spring onion · Sesame-tomato achar',
    },
    price: 0,
    variants: momoStyleVariants,
    allergens: ['gluten', 'sesame'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  {
    id: 'mnm-veg-momo',
    slug: 'veg-momo',
    category: 'momos',
    name: { fr: 'Momo Légumes', en: 'Veg Momo' },
    nameNe: { text: 'तरकारी मम:', verified: false },
    description: {
      fr: 'Légumes de saison · Tofu · Herbes · Pâte fine main',
      en: 'Seasonal vegetables · Tofu · Herbs · Hand-rolled skin',
    },
    price: 0,
    variants: momoStyleVariants,
    allergens: ['gluten', 'soy'],
    diet: ['vegetarian', 'vegan'],
    spice: 0,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  // SOUPES
  {
    id: 'mnm-thukpa',
    slug: 'thukpa',
    category: 'soupes',
    name: { fr: 'Thukpa', en: 'Thukpa' },
    nameNe: { text: 'थुक्पा', verified: false },
    description: {
      fr: 'Nouilles tibétaines · Légumes · Bouillon de montagne',
      en: 'Tibetan noodles · Vegetables · Mountain broth',
    },
    price: 0,
    allergens: ['gluten'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  {
    id: 'mnm-thenthuk',
    slug: 'thenthuk',
    category: 'soupes',
    name: { fr: 'Thenthuk', en: 'Thenthuk' },
    nameNe: { text: 'थेन्थुक', verified: false },
    description: {
      fr: 'Nouilles tirées à la main · Bouillon profond · Légumes',
      en: 'Hand-pulled noodles · Deep broth · Vegetables',
    },
    price: 0,
    allergens: ['gluten'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  // ACCOMPAGNEMENTS
  {
    id: 'mnm-achar',
    slug: 'achar',
    category: 'accompagnements',
    name: { fr: 'Achar Sésame-Tomate', en: 'Sesame-Tomato Achar' },
    nameNe: { text: 'अचार', verified: false },
    description: {
      fr: 'Tomate · Sésame · Timur · Coriandre',
      en: 'Tomato · Sesame · Timur · Coriander',
    },
    price: 0,
    allergens: ['sesame'],
    diet: ['vegetarian', 'vegan'],
    spice: 2,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
];

// ─── POISSONNIÈRE MENU ────────────────────────────────────────────────────────
// TODO: Confirm which dishes differ from Montmartre
export const poissonniereMenu: Dish[] = [
  {
    id: 'poi-buff-momo',
    slug: 'buff-momo',
    category: 'momos',
    name: { fr: 'Momo Buffle', en: 'Buff Momo' },
    nameNe: { text: 'बफ मम:', verified: false },
    description: {
      fr: 'Buffle d\'eau · Gingembre · Coriandre · Pâte fine main',
      en: 'Water buffalo · Ginger · Coriander · Hand-rolled skin',
    },
    price: 0,
    variants: momoStyleVariants,
    allergens: ['gluten'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    signature: true,
    sampleOnly: true,
  },
  {
    id: 'poi-chicken-momo',
    slug: 'chicken-momo',
    category: 'momos',
    name: { fr: 'Momo Poulet', en: 'Chicken Momo' },
    nameNe: { text: 'चिकन मम:', verified: false },
    description: {
      fr: 'Poulet · Ail · Ciboulette · Achar sésame-tomate',
      en: 'Chicken · Garlic · Spring onion · Sesame-tomato achar',
    },
    price: 0,
    variants: momoStyleVariants,
    allergens: ['gluten', 'sesame'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  {
    id: 'poi-veg-momo',
    slug: 'veg-momo',
    category: 'momos',
    name: { fr: 'Momo Légumes', en: 'Veg Momo' },
    nameNe: { text: 'तरकारी मम:', verified: false },
    description: {
      fr: 'Légumes de saison · Tofu · Herbes · Pâte fine main',
      en: 'Seasonal vegetables · Tofu · Herbs · Hand-rolled skin',
    },
    price: 0,
    variants: momoStyleVariants,
    allergens: ['gluten', 'soy'],
    diet: ['vegetarian', 'vegan'],
    spice: 0,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  {
    id: 'poi-kothey',
    slug: 'kothey-momo',
    category: 'momos',
    name: { fr: 'Kothey Momo', en: 'Kothey Momo' },
    nameNe: { text: 'कोठे मम:', verified: false },
    description: {
      fr: 'Poêlé · Base croustillante · Juteux à l\'intérieur',
      en: 'Pan-fried · Crispy base · Juicy inside',
    },
    price: 0,
    allergens: ['gluten'],
    diet: [],
    spice: 0,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  {
    id: 'poi-thukpa',
    slug: 'thukpa',
    category: 'soupes',
    name: { fr: 'Thukpa', en: 'Thukpa' },
    nameNe: { text: 'थुक्पा', verified: false },
    description: {
      fr: 'Nouilles tibétaines · Légumes · Bouillon de montagne',
      en: 'Tibetan noodles · Vegetables · Mountain broth',
    },
    price: 0,
    allergens: ['gluten'],
    diet: [],
    spice: 1,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
  {
    id: 'poi-achar',
    slug: 'achar',
    category: 'accompagnements',
    name: { fr: 'Achar Sésame-Tomate', en: 'Sesame-Tomato Achar' },
    nameNe: { text: 'अचार', verified: false },
    description: {
      fr: 'Tomate · Sésame · Timur · Coriandre',
      en: 'Tomato · Sesame · Timur · Coriander',
    },
    price: 0,
    allergens: ['sesame'],
    diet: ['vegetarian', 'vegan'],
    spice: 2,
    available: true,
    orderable: true,
    sampleOnly: true,
  },
];

export const MENU_CATEGORIES: Record<string, { fr: string; en: string }> = {
  momos:           { fr: 'Momos', en: 'Momos' },
  soupes:          { fr: 'Soupes', en: 'Soups' },
  accompagnements: { fr: 'Accompagnements', en: 'Sides' },
};

export function getMenuByHouse(houseId: 'montmartre' | 'poissonniere'): Dish[] {
  return houseId === 'montmartre' ? montmartreMenu : poissonniereMenu;
}

export function formatPrice(cents: number, locale: 'fr' | 'en'): string {
  if (cents === 0) return '—';
  const euros = cents / 100;
  if (locale === 'fr') {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(euros);
  }
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(euros);
}
