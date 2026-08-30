export type BranchId = "montmartre" | "poissonniere";

export const site = {
  name: "MOMO HOUSE",
  tagline: "STREET FOOD DU NÉPAL & DU TIBET",
  copyright: "© 2026 MOMO HOUSE. Tous droits réservés.",
  email: "contact@momohouse.fr",
  phone: "+33 1 23 45 67 89",
  instagram: "https://instagram.com/momohouse",
};

export const branches = {
  montmartre: {
    id: "montmartre" as const,
    name: "Montmartre",
    shortLabel: "Montmartre",
    district: "Paris 18e",
    addressLines: ["85 Rue Montmartre", "75002 Paris", "France"],
    addressInline: "85 Rue Montmartre, 75002 Paris",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=85+Rue+Montmartre+75002+Paris",
    email: "montmartre@momohouse.fr",
    phone: "+33 1 00 00 00 00",
    hours: [
      {
        days: "Lundi - Jeudi",
        times: ["12h00 - 14h30", "19h00 - 22h30"],
        closed: false,
      },
      {
        days: "Vendredi - Samedi",
        times: ["12h00 - 15h00", "19h00 - 23h00"],
        closed: false,
      },
      { days: "Dimanche", times: ["Fermé"], closed: true },
    ],
    heroEyebrow: "MOMO HOUSE",
    heroTitle: "Montmartre",
    heroBody:
      "Niché au cœur du 2ème arrondissement, notre établissement historique vous accueille dans une atmosphère chaleureuse et boisée. L'essence de la street food népalaise, servie avec élégance et authenticité.",
    sketch: "/images/montmartre-hero.png",
    map: "/images/map-montmartre.png",
    branchSketch: "/images/branch-montmartre.png",
  },
  poissonniere: {
    id: "poissonniere" as const,
    name: "Poissonnière",
    shortLabel: "Poissonnière",
    district: "Paris 9e",
    addressLines: ["46 Rue Poissonnière", "75009 Paris, France"],
    addressInline: "46 Rue Poissonnière, 75009 Paris",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=46+Rue+Poissonni%C3%A8re+75009+Paris",
    email: "contact@momohouse.fr",
    phone: "+33 1 23 45 67 89",
    hours: [
      {
        days: "Lundi - Jeudi",
        times: ["12h00 - 15h00 | 19h00 - 22h30"],
        closed: false,
      },
      {
        days: "Vendredi - Samedi",
        times: ["12h00 - 15h00 | 19h00 - 23h30"],
        closed: false,
      },
      { days: "Dimanche", times: ["Fermé"], closed: false },
    ],
    heroTitle: "Poissonnière",
    heroBody:
      "L'énergie vibrante du 9ème arrondissement rencontre la chaleur authentique de nos cuisines. Un espace moderne, conçu pour partager des moments intenses autour de nos spécialités.",
    sketch: "/images/poissonniere-hero.png",
    map: "/images/map-poissonniere.png",
    branchSketch: "/images/branch-poissonniere.png",
    atmosphere: {
      title: "L'Atmosphère",
      paragraphs: [
        "Inspiré par les ruelles animées de Katmandou et repensé pour l'élégance parisienne, notre restaurant de Poissonnière offre une ambiance électrique. Les murs en briques apparentes et l'éclairage tamisé créent un contraste saisissant avec les couleurs chaudes de nos plats.",
        "C'est l'endroit idéal pour un déjeuner d'affaires décontracté ou un dîner festif entre amis, au rythme d'une playlist soigneusement sélectionnée.",
      ],
      image: "/images/atmosphere.png",
    },
  },
} as const;

export const craftSteps = [
  {
    step: "01 / 03",
    nepali: "पिठो",
    french: "LA PÂTE",
    body: "Farine, eau, sel. Roulée en disques de sept centimètres, jamais à l'avance.",
    image: "/images/craft-pate.png",
  },
  {
    step: "02 / 03",
    nepali: "मसला",
    french: "LA FARCE",
    body: "Bœuf ou poulet haché au couteau, gingembre, ciboule, timur. Quatorze plis ramenés vers le sommet.",
    image: "/images/craft-farce.png",
  },
  {
    step: "03 / 03",
    nepali: "भाप",
    french: "LA VAPEUR",
    body: "Neuf minutes en panier de bambou. La pâte devient translucide. On sert immédiatement.",
    image: "/images/craft-vapeur.png",
  },
] as const;

export const dishes = [
  {
    nepali: "झोल मोमो",
    french: "JHOL MOMO",
    bullets: [
      "Bouillon sésame-tomate",
      "Momo vapeur, buff",
      "Huile de piment timur",
      "Coriandre, ail frit",
    ],
    tag: "MONTMARTRE — SERVICE DU SOIR",
    image: "/images/dish-jhol.png",
    imageLeft: true,
  },
  {
    nepali: "कोठे मोमो",
    french: "KOTHE MOMO",
    bullets: [
      "Mi-vapeur, mi-poêlé",
      "Farce au poulet gingembre",
      "Fond croustillant doré",
      "Sauce aigre-douce maison",
    ],
    tag: "POISSONNIÈRE — SERVICE DU MIDI",
    image: "/images/dish-kothe.png",
    imageLeft: false,
  },
] as const;

export const testimonial = {
  quote:
    "Une adresse qui redonne ses lettres de noblesse à la street food himalayenne. Les momos sont d'une finesse rare, et le bouillon jhol est un aller simple pour Katmandou.",
  attribution: "— LE FOODING PARIS",
};

export const reservationTimes = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const;

export const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function isBranchId(
  value: string | null | undefined,
): value is BranchId {
  return value === "montmartre" || value === "poissonniere";
}
