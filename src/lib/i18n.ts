export type Language = 'en' | 'fr';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'fr', label: 'Français', nativeLabel: 'FR' },
];

const translations = {
  en: {
    // Nav
    nav: {
      theWorld: 'THE WORLD',
      theFood: 'THE FOOD',
      ourHouses: 'OUR HOUSES',
      chooseYourHouse: 'CHOOSE YOUR HOUSE',
    },
    // Hero
    hero: {
      tagline: 'TWO HOUSES. ONE WORLD.',
      subTagline: 'PARIS · NEPAL · TIBET',
      scrollCta: 'SCROLL TO EXPLORE',
    },
    // Manifesto strip
    manifesto: {
      items: ['STEAMED', 'FRIED', 'SOUP', 'SPICY', 'HANDMADE', 'PARIS', 'NEPAL', 'TIBET'],
    },
    // Momo section
    momo: {
      label: 'THE MOMO',
      headline1: 'SMALL',
      headline2: 'PARCELS.',
      headline3: 'BIG',
      headline4: 'PERSONALITY.',
      description: 'Each momo is a small world. Folded by hand, filled with care, and served with the kind of warmth that only comes from a kitchen that means it.',
      types: [
        { name: 'STEAMED', desc: 'The classic. Delicate skin, rich filling.' },
        { name: 'FRIED', desc: 'Golden, crisp, impossible to resist.' },
        { name: 'SOUP', desc: 'Broth-bathed, deeply comforting.' },
        { name: 'SPICY', desc: 'Chilli-kissed, for the brave.' },
      ],
    },
    // Culture section
    culture: {
      label: 'THE WORLD',
      headline1: 'KATHMANDU',
      headline2: 'MEETS',
      headline3: 'PARIS.',
      body1: 'From the mountain kitchens of Nepal and Tibet, a recipe traveled west. It found a home in Paris — not by accident, but by design.',
      body2: 'Momo House is where two worlds meet over a shared table. The flavours are Himalayan. The address is Parisian. The welcome is universal.',
      nepal: 'NEPAL',
      tibet: 'TIBET',
      paris: 'PARIS',
    },
    // Location selector
    locations: {
      label: 'OUR HOUSES',
      explorePrefix: 'EXPLORE',
      tapToExplore: 'TAP TO EXPLORE',
      montmartre: {
        description: 'The original house. Parisian soul.',
      },
      poissonniere: {
        description: 'Street energy. Contemporary spirit.',
      },
    },
    // Paris map
    map: {
      label: 'FIND US',
      headline: 'TWO ADDRESSES.\nONE PARIS.',
      body: 'Both houses are in the heart of Paris, minutes apart by metro. Choose your neighbourhood, choose your evening.',
    },
    // Brand story
    brand: {
      label: 'MOMO FIRST.',
      headline1: 'HANDMADE.',
      headline2: 'EVERY',
      headline3: 'DAY.',
      body1: 'Since the first dumpling, nothing has changed. Except the address.',
      body2: 'Two houses in Paris. The same soul in every fold. Steamed, fried, in broth, or spiced — each momo is made with the same care that travels with every recipe from Nepal to France.',
      stat1Num: '2',
      stat1Label: 'HOUSES IN PARIS',
      stat2Num: '∞',
      stat2Label: 'MOMOS PER DAY',
      dividerLabel: 'IN PARIS',
    },
    // Footer
    footer: {
      question: 'SO...',
      headline: 'WHERE ARE WE\nEATING?',
      copyright: '© {year} Momo House Paris',
      privacy: 'Privacy',
    },
    // House pages
    housePage: {
      backToHome: '← BACK TO MOMO HOUSE',
      restaurantDetails: 'RESTAURANT',
      address: 'ADDRESS',
      hours: 'OPENING HOURS',
      phone: 'PHONE',
      menuPreview: 'MENU PREVIEW',
      menuLabel: 'A TASTE OF WHAT AWAITS',
      reservationCta: 'RESERVE A TABLE',
      reservationLabel: 'BOOK YOUR EXPERIENCE',
      reservationBody: 'Walk-ins welcome. Reservations recommended for dinner service.',
      reserveButton: 'MAKE A RESERVATION',
      visitWebsite: 'VISIT FULL WEBSITE',
      locationLabel: 'FIND US',
      galleryLabel: 'THE ATMOSPHERE',
      gallerySubLabel: 'INSIDE THE HOUSE',
      exploreOther: 'EXPLORE THE OTHER HOUSE',
      reserveFallback: 'BOOKING UNAVAILABLE',
      reserveFallbackSub: 'Please call us to reserve',
      reserveExternalLabel: 'Opens external site',
      reserveComingSoon: 'ONLINE BOOKING COMING SOON',
      reserveComingSoonSub: 'Direct booking launching soon',
    },
    // Montmartre page specific
    montmartrePage: {
      heroTagline: 'THE ORIGINAL HOUSE',
      heroSubline: 'PARISIAN SOUL. NEPALESE HEART.',
      about: 'Nestled in the 2nd arrondissement, steps from the Grands Boulevards, Momo House Montmartre is where the story began. Warm interiors, hanging lanterns, and the smell of freshly steamed dumplings.',
      hours: 'Mon–Sat: 12:00–14:30 · 19:00–22:30\nSunday: 12:00–15:00',
    },
    // Poissonnière page specific
    poissonierePage: {
      heroTagline: 'THE URBAN HOUSE',
      heroSubline: 'STREET ENERGY. CONTEMPORARY SPIRIT.',
      about: 'In the vibrant 10th arrondissement, Momo House Poissonnière brings the same handmade tradition to a lively, contemporary setting. The energy of the street, the warmth of the kitchen.',
      hours: 'Mon–Sat: 11:30–15:00 · 18:30–23:00\nSunday: 12:00–15:30',
    },
    // Guest reviews
    reviews: {
      label: 'GUEST VOICES',
      headline1: 'WHAT THEY',
      headline2: 'REMEMBER.',
      aggregateLabel: '200+ REVIEWS',
      footerNote: 'COLLECTED FROM GUESTS ACROSS BOTH HOUSES',
      items: [
        {
          quote: 'The steamed momos were unlike anything I\'ve had in Paris. Delicate, precise, and deeply comforting — like someone folded a memory into each one.',
          author: 'SOPHIE L.',
          location: 'MONTMARTRE · TABLE 4',
          rating: 5,
          tag: 'DINING MOMENT',
        },
        {
          quote: 'We came for a quick lunch and stayed for two hours. The fried momos with the chilli sauce — I still think about them. The room has this quiet warmth that makes you want to linger.',
          author: 'JAMES & CLARA T.',
          location: 'POISSONNIÈRE · FRIDAY EVENING',
          rating: 5,
          tag: 'ATMOSPHERE',
        },
        {
          quote: 'Authentic in a way that is rare. The soup momos arrived in a broth so clean and deep it felt like it had been simmering for days. Probably had.',
          author: 'KENJI M.',
          location: 'MONTMARTRE · SOLO DINNER',
          rating: 5,
          tag: 'THE FOOD',
        },
        {
          quote: 'A neighbourhood restaurant that feels like a discovery every time. The spicy momos are not for the faint-hearted — and that is exactly the point.',
          author: 'AMARA D.',
          location: 'POISSONNIÈRE · REGULAR GUEST',
          rating: 5,
          tag: 'RETURNING GUEST',
        },
      ],
    },
  },
  fr: {
    // Nav
    nav: {
      theWorld: 'LE MONDE',
      theFood: 'LA CUISINE',
      ourHouses: 'NOS MAISONS',
      chooseYourHouse: 'CHOISIR VOTRE MAISON',
    },
    // Hero
    hero: {
      tagline: 'DEUX MAISONS. UN MONDE.',
      subTagline: 'PARIS · NÉPAL · TIBET',
      scrollCta: 'DÉFILER POUR EXPLORER',
    },
    // Manifesto strip
    manifesto: {
      items: ['VAPEUR', 'FRIT', 'BOUILLON', 'ÉPICÉ', 'FAIT MAIN', 'PARIS', 'NÉPAL', 'TIBET'],
    },
    // Momo section
    momo: {
      label: 'LE MOMO',
      headline1: 'PETITS',
      headline2: 'TRÉSORS.',
      headline3: 'GRANDE',
      headline4: 'PERSONNALITÉ.',
      description: 'Chaque momo est un petit monde. Plié à la main, garni avec soin, servi avec la chaleur qui ne vient que d\'une cuisine qui le ressent vraiment.',
      types: [
        { name: 'VAPEUR', desc: 'Le classique. Peau délicate, farce généreuse.' },
        { name: 'FRIT', desc: 'Doré, croustillant, irrésistible.' },
        { name: 'BOUILLON', desc: 'Baigné de bouillon, profondément réconfortant.' },
        { name: 'ÉPICÉ', desc: 'Pimenté, pour les courageux.' },
      ],
    },
    // Culture section
    culture: {
      label: 'LE MONDE',
      headline1: 'KATMANDOU',
      headline2: 'RENCONTRE',
      headline3: 'PARIS.',
      body1: 'Des cuisines de montagne du Népal et du Tibet, une recette a voyagé vers l\'ouest. Elle a trouvé sa maison à Paris — non par hasard, mais par dessein.',
      body2: 'Momo House est l\'endroit où deux mondes se retrouvent autour d\'une table partagée. Les saveurs sont himalayennes. L\'adresse est parisienne. L\'accueil est universel.',
      nepal: 'NÉPAL',
      tibet: 'TIBET',
      paris: 'PARIS',
    },
    // Location selector
    locations: {
      label: 'NOS MAISONS',
      explorePrefix: 'EXPLORER',
      tapToExplore: 'APPUYER POUR EXPLORER',
      montmartre: {
        description: 'La maison originale. L\'âme parisienne.',
      },
      poissonniere: {
        description: 'Énergie urbaine. Esprit contemporain.',
      },
    },
    // Paris map
    map: {
      label: 'NOUS TROUVER',
      headline: 'DEUX ADRESSES.\nUN PARIS.',
      body: 'Les deux maisons sont au cœur de Paris, à quelques minutes en métro. Choisissez votre quartier, choisissez votre soirée.',
    },
    // Brand story
    brand: {
      label: 'MOMO D\'ABORD.',
      headline1: 'FAIT MAIN.',
      headline2: 'CHAQUE',
      headline3: 'JOUR.',
      body1: 'Depuis le premier dumpling, rien n\'a changé. Sauf l\'adresse.',
      body2: 'Deux maisons à Paris. La même âme dans chaque pli. Vapeur, frit, en bouillon ou épicé — chaque momo est fait avec le même soin qui voyage avec chaque recette du Népal à la France.',
      stat1Num: '2',
      stat1Label: 'MAISONS À PARIS',
      stat2Num: '∞',
      stat2Label: 'MOMOS PAR JOUR',
      dividerLabel: 'À PARIS',
    },
    // Footer
    footer: {
      question: 'ALORS...',
      headline: 'OÙ ALLONS-NOUS\nMANGER ?',
      copyright: '© {year} Momo House Paris',
      privacy: 'Confidentialité',
    },
    // House pages
    housePage: {
      backToHome: '← RETOUR À MOMO HOUSE',
      restaurantDetails: 'RESTAURANT',
      address: 'ADRESSE',
      hours: 'HORAIRES',
      phone: 'TÉLÉPHONE',
      menuPreview: 'APERÇU DU MENU',
      menuLabel: 'UN AVANT-GOÛT DE CE QUI VOUS ATTEND',
      reservationCta: 'RÉSERVER UNE TABLE',
      reservationLabel: 'RÉSERVEZ VOTRE EXPÉRIENCE',
      reservationBody: 'Sans réservation bienvenu. Réservation recommandée pour le service du soir.',
      reserveButton: 'FAIRE UNE RÉSERVATION',
      visitWebsite: 'VISITER LE SITE COMPLET',
      locationLabel: 'NOUS TROUVER',
      galleryLabel: 'L\'ATMOSPHÈRE',
      gallerySubLabel: 'À L\'INTÉRIEUR DE LA MAISON',
      exploreOther: 'EXPLORER L\'AUTRE MAISON',
      reserveFallback: 'RÉSERVATION INDISPONIBLE',
      reserveFallbackSub: 'Veuillez nous appeler pour réserver',
      reserveExternalLabel: 'Ouvre un site externe',
      reserveComingSoon: 'RÉSERVATION EN LIGNE BIENTÔT',
      reserveComingSoonSub: 'Réservation directe bientôt disponible',
    },
    // Montmartre page specific
    montmartrePage: {
      heroTagline: 'LA MAISON ORIGINALE',
      heroSubline: 'ÂME PARISIENNE. CŒUR NÉPALAIS.',
      about: 'Nichée dans le 2e arrondissement, à deux pas des Grands Boulevards, Momo House Montmartre est là où l\'histoire a commencé. Intérieurs chaleureux, lanternes suspendues et l\'odeur des dumplings fraîchement cuits à la vapeur.',
      hours: 'Lun–Sam : 12h00–14h30 · 19h00–22h30\nDimanche : 12h00–15h00',
    },
    // Poissonnière page specific
    poissonierePage: {
      heroTagline: 'LA MAISON URBAINE',
      heroSubline: 'ÉNERGIE DE RUE. ESPRIT CONTEMPORAIN.',
      about: 'Dans le vibrant 10e arrondissement, Momo House Poissonnière apporte la même tradition artisanale dans un cadre vivant et contemporain. L\'énergie de la rue, la chaleur de la cuisine.',
      hours: 'Lun–Sam : 11h30–15h00 · 18h30–23h00\nDimanche : 12h00–15h30',
    },
    // Guest reviews
    reviews: {
      label: 'VOIX DES INVITÉS',
      headline1: 'CE QU\'ILS',
      headline2: 'RETIENNENT.',
      aggregateLabel: '200+ AVIS',
      footerNote: 'RECUEILLIS AUPRÈS DES INVITÉS DES DEUX MAISONS',
      items: [
        {
          quote: 'Les momos vapeur étaient comme rien de ce que j\'ai goûté à Paris. Délicats, précis, profondément réconfortants — comme si quelqu\'un avait plié un souvenir dans chacun d\'eux.',
          author: 'SOPHIE L.',
          location: 'MONTMARTRE · TABLE 4',
          rating: 5,
          tag: 'MOMENT DE TABLE',
        },
        {
          quote: 'Nous sommes venus pour un déjeuner rapide et sommes restés deux heures. Les momos frits avec la sauce pimentée — j\'y pense encore. La salle a cette chaleur tranquille qui donne envie de s\'attarder.',
          author: 'JAMES & CLARA T.',
          location: 'POISSONNIÈRE · VENDREDI SOIR',
          rating: 5,
          tag: 'ATMOSPHÈRE',
        },
        {
          quote: 'Authentique d\'une façon rare. Les momos en bouillon sont arrivés dans un bouillon si pur et profond qu\'il semblait mijoter depuis des jours. Probablement le cas.',
          author: 'KENJI M.',
          location: 'MONTMARTRE · DÎNER SOLO',
          rating: 5,
          tag: 'LA CUISINE',
        },
        {
          quote: 'Un restaurant de quartier qui ressemble à une découverte à chaque fois. Les momos épicés ne sont pas pour les âmes sensibles — et c\'est exactement le but.',
          author: 'AMARA D.',
          location: 'POISSONNIÈRE · INVITÉE RÉGULIÈRE',
          rating: 5,
          tag: 'INVITÉE FIDÈLE',
        },
      ],
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}
