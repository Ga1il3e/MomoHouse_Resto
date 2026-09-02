export type BranchId = "montmartre" | "poissonniere";

export const site = {
  name: "MOMO HOUSE",
  tagline: "STREET FOOD DU NÉPAL & DU TIBET",
  copyright: "© 2026 MOMO HOUSE. Tous droits réservés.",
  email: "contact@momohouse.fr",
  phone: "+33 1 42 36 57 21",
  instagram: "https://instagram.com/momo_house_fr",
};

export type GoogleReview = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  source: "Google";
};

export const branches = {
  montmartre: {
    id: "montmartre" as const,
    name: "Montmartre",
    shortLabel: "Montmartre",
    district: "Paris 2e",
    addressLines: ["85 Rue Montmartre", "75002 Paris", "France"],
    addressInline: "85 Rue Montmartre, 75002 Paris",
    mapsUrl: "https://maps.app.goo.gl/H2cmVp1GPnp1wSUB7",
    reviewsUrl:
      "https://search.google.com/local/reviews?placeid=ChIJLSDxUwRv5kcRb4_U-EzFOGQ",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJLSDxUwRv5kcRb4_U-EzFOGQ",
    email: "montmartre@momohouse.fr",
    phone: "+33 6 06 88 72 62",
    metro: "Sentier (ligne 3) · Bourse (ligne 3)",
    amenities: [
      "Sur place",
      "À emporter",
      "Réservation",
      "Paiement sans contact",
    ],
    website: "https://momo-house-montmartre.fr",
    googleRating: 4.7,
    googleReviewCount: 208,
    hours: [
      {
        days: "Lundi",
        times: ["12h00 - 14h30"],
        closed: false,
      },
      {
        days: "Mardi - Samedi",
        times: ["12h00 - 14h30", "18h00 - 22h30"],
        closed: false,
      },
      { days: "Dimanche", times: ["Fermé"], closed: true },
    ],
    reviews: [
      {
        author: "Anne R.",
        rating: 5 as const,
        quote:
          "Équipe super sympa, momos plutôt bons. Je n'ai pas goûté à tout mais dans l'ensemble une adresse à garder pour une prochaine sortie.",
        source: "Google" as const,
      },
      {
        author: "Jacobin J.",
        rating: 5 as const,
        quote:
          "Service excellent, et des plats dépaysants, et très bons. Nous avons passé un agréable moment. On y retourne.",
        source: "Google" as const,
      },
      {
        author: "Antonit",
        rating: 5 as const,
        quote:
          "First time I tried Nepali food and I loved it. Service is so fast and the mood is cozy. You can share a lot of dishes.",
        source: "Google" as const,
      },
    ] satisfies GoogleReview[],
    heroEyebrow: "MOMO HOUSE",
    heroTitle: "Montmartre",
    heroBody:
      "Niché au cœur du 2ème arrondissement, notre établissement vous accueille dans une atmosphère chaleureuse. L'essence de la street food népalaise, servie avec élégance et authenticité.",
    sketch: "/images/montmartre-hero.png",
    map: "/images/map-montmartre.png",
    branchSketch: "/images/branch-montmartre.png",
    imageFocus: "center" as const,
  },
  poissonniere: {
    id: "poissonniere" as const,
    name: "Poissonnière",
    shortLabel: "Poissonnière",
    district: "Paris 10e",
    addressLines: ["46 Rue Poissonnière", "75010 Paris", "France"],
    addressInline: "46 Rue Poissonnière, 75010 Paris",
    mapsUrl: "https://maps.app.goo.gl/SrJprbnSJDc3NNDKA",
    reviewsUrl:
      "https://search.google.com/local/reviews?placeid=ChIJf0_2xJVv5kcR856F79dvS3w",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJf0_2xJVv5kcR856F79dvS3w",
    email: "poissonniere@momohouse.fr",
    phone: "+33 1 42 36 57 21",
    metro: "Poissonnière (ligne 7) · Bonne Nouvelle (lignes 8 et 9)",
    amenities: [
      "Sur place",
      "À emporter",
      "Livraison",
      "Terrasse",
      "Réservation",
    ],
    website: "https://momo-house.fr",
    googleRating: 4.7,
    googleReviewCount: 1087,
    hours: [
      {
        days: "Lundi - Dimanche",
        times: ["12h00 - 14h30", "18h00 - 22h00"],
        closed: false,
      },
    ],
    reviews: [
      {
        author: "Prajowl Adhikari",
        rating: 5 as const,
        quote:
          "10 out of 5 in food and service. The momos were as good as back in Nepal. The décor hit a nostalgic vibe which took us back home.",
        source: "Google" as const,
      },
      {
        author: "Nina Treboux",
        rating: 5 as const,
        quote:
          "Honestly one of the best lunch spots in the neighborhood. They’re super welcoming and the atmosphere is great. The food is awesome.",
        source: "Google" as const,
      },
      {
        author: "Carol Mackin",
        rating: 5 as const,
        quote:
          "Delicious and served fast. Great flavor, and you can add more spice. We shared fried, steamed and soup momos. Very nice staff too.",
        source: "Google" as const,
      },
    ] satisfies GoogleReview[],
    heroEyebrow: "MOMO HOUSE",
    heroTitle: "Poissonnière",
    heroBody:
      "Petite salle, grande générosité. Au 10ème, nos momos se dégustent sur place ou à emporter, dans une atmosphère chaleureuse tout près du métro Poissonnière.",
    sketch: "/images/branch-poissonniere.png",
    map: "/images/map-poissonniere.png",
    branchSketch: "/images/branch-poissonniere.png",
    imageFocus: "storefront" as const,
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

export function otherBranchId(id: BranchId): BranchId {
  switch (id) {
    case "montmartre":
      return "poissonniere";
    case "poissonniere":
      return "montmartre";
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function imageFocusClass(
  focus: (typeof branches)[BranchId]["imageFocus"],
): string {
  switch (focus) {
    case "center":
      return "object-cover object-center";
    case "storefront":
      return "object-cover object-top";
    default: {
      const _exhaustive: never = focus;
      return _exhaustive;
    }
  }
}

export type MenuTagTone = "neutral" | "veg" | "spicy" | "hot" | "crispy";

export type MenuTag = {
  label: string;
  tone: MenuTagTone;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  tags: MenuTag[];
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export type BranchMenu = {
  branchId: BranchId;
  eyebrow: string;
  title: string;
  body: string;
  heroImage: string;
  heroAlt: string;
  categories: MenuCategory[];
};

export const menus: Record<BranchId, BranchMenu> = {
  montmartre: {
    branchId: "montmartre",
    eyebrow: "Menu Signature",
    title: "Commandes — Montmartre",
    body: "Découvrez nos recettes authentiques, préparées chaque jour à la main dans notre cuisine de Montmartre. Une fusion de traditions himalayennes et de produits frais locaux.",
    heroImage: "/images/menu/montmartre-hero.jpg",
    heroAlt: "Intérieur du restaurant Momo House Montmartre",
    categories: [
      {
        id: "les-momos",
        title: "Les Momos (Signature)",
        items: [
          {
            id: "jhol-momo",
            name: "Jhol Momo",
            description:
              "Nos momos signatures plongés dans un bouillon chaud et onctueux à la tomate, sésame et épices himalayennes. Un réconfort absolu.",
            price: "14,50 €",
            image: "/images/menu/montmartre-jhol.jpg",
            imageAlt: "Jhol Momo dans un bouillon tomate-sésame",
            tags: [
              { label: "Porc", tone: "neutral" },
              { label: "Épicé", tone: "spicy" },
            ],
          },
          {
            id: "kothe-momo",
            name: "Kothe Momo",
            description:
              "Momos mi-cuits à la vapeur, mi-poêlés pour un contraste parfait. Croustillants en dessous, fondants au-dessus. Servis avec notre sauce piquante maison.",
            price: "13,00 €",
            image: "/images/menu/montmartre-kothe.jpg",
            imageAlt: "Kothe Momo mi-vapeur, mi-poêlés",
            tags: [{ label: "Poulet", tone: "neutral" }],
          },
          {
            id: "momos-vapeur",
            name: "Momos Vapeur Classiques",
            description:
              "L'authenticité pure. Nos raviolis cuits à la vapeur, farce juteuse aux légumes croquants et gingembre frais.",
            price: "12,50 €",
            image: "/images/menu/montmartre-vapeur.jpg",
            imageAlt: "Momos vapeur dans un panier de bambou",
            tags: [{ label: "Végétarien", tone: "veg" }],
          },
        ],
      },
    ],
  },
  poissonniere: {
    branchId: "poissonniere",
    eyebrow: "Menu Signature",
    title: "Commandes — Poissonnière",
    body: "Découvrez nos spécialités népalaises, préparées avec amour et épices authentiques. Retrait ou dégustation sur place dans notre chaleureux restaurant.",
    heroImage: "/images/menu/poissonniere-hero.jpg",
    heroAlt: "Intérieur du restaurant Momo House Poissonnière",
    categories: [
      {
        id: "les-momos",
        title: "Les Momos",
        items: [
          {
            id: "jhol-momo",
            name: "Jhol Momo",
            description:
              "Momos traditionnels plongés dans un bouillon chaud et épicé aux tomates grillées et sésame. Parfait pour se réchauffer.",
            price: "14,50 €",
            image: "/images/menu/poissonniere-jhol.jpg",
            imageAlt: "Jhol Momo dans un bouillon épicé",
            tags: [
              { label: "Épicé", tone: "spicy" },
              { label: "Végétarien (option)", tone: "veg" },
            ],
          },
          {
            id: "chilli-momo",
            name: "Spicy Cather (Chilli Momo)",
            description:
              "Momos frits puis poêlés dans une sauce pimentée maison, oignons et poivrons. Pour les amateurs de sensations fortes.",
            price: "15,00 €",
            image: "/images/menu/poissonniere-chilli.jpg",
            imageAlt: "Chilli Momo nappés d'une sauce piment-ail",
            tags: [{ label: "Très épicé", tone: "hot" }],
          },
          {
            id: "golden-fried",
            name: "Golden Fried",
            description:
              "Momos croustillants dorés à la perfection, servis avec notre sauce spéciale Momo House à la coriandre fraîche.",
            price: "13,50 €",
            image: "/images/menu/poissonniere-fried.jpg",
            imageAlt: "Momos frits dorés avec sauce",
            tags: [{ label: "Croustillant", tone: "crispy" }],
          },
        ],
      },
    ],
  },
};
