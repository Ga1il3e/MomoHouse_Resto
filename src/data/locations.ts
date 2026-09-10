export interface Location {
  id: 'montmartre' | 'poissonniere';
  name: string;
  fullName: string;
  address: string;
  arrondissement: string;
  phone: string;
  /** Internal house route — never link Montmartre to momo-house-montmartre.fr */
  href: string;
  mapsUrl: string;
  personality: string[];
  description: string;
  descriptionFr: string;
  color: string;
  mapCoords: { x: number; y: number };
  storefrontImage: string;
  roomImage: string;
  /** Display-only hours until owner confirms — always treat as unverified */
  hoursLines: { fr: string[]; en: string[] };
  metro: { fr: string; en: string };
}

export const locations: Location[] = [
  {
    id: 'montmartre',
    name: 'Montmartre',
    fullName: 'MOMO HOUSE MONTMARTRE',
    address: '85 Rue Montmartre',
    arrondissement: '75002 Paris',
    phone: '+33 9 77 48 77 25',
    href: '/montmartre',
    // Official Maps listing (do not invent hours/ratings from this)
    mapsUrl: 'https://share.google/HocavOOktlpGHq4Cc',
    personality: ['ARTISTIC', 'CLASSIC', 'WARM'],
    description: 'The Sentier house. Parisian soul, Himalayan fold.',
    descriptionFr:
      'La maison du Sentier. Âme parisienne, pli himalayen.',
    color: '#C4714A',
    mapCoords: { x: 48, y: 38 },
    storefrontImage: '/assets/images/montmartre-1789036940381.png',
    roomImage: '/assets/images/mnm-1789036940372.png',
    // TODO: replace with owner-confirmed hours — do not invent schedule
    hoursLines: {
      en: [
        'Opening hours — confirm by phone',
        'or on Google Maps',
      ],
      fr: [
        'Horaires — confirmez par téléphone',
        'ou sur Google Maps',
      ],
    },
    metro: {
      en: 'Near Sentier / Bourse',
      fr: 'Proche Sentier / Bourse',
    },
  },
  {
    id: 'poissonniere',
    name: 'Poissonnière',
    fullName: 'MOMO HOUSE POISSONNIÈRE',
    address: '46 Rue Poissonnière',
    // Postcode still unverified — show district without inventing certainty
    arrondissement: 'Paris 9e',
    phone: '+33 1 42 36 57 21',
    href: '/poissonniere',
    mapsUrl: 'https://share.google/bf0T7aoVSRf92ROxi',
    personality: ['URBAN', 'STREET', 'LIVELY'],
    description: 'Street energy. Contemporary spirit.',
    descriptionFr: 'Énergie de rue. Esprit contemporain.',
    color: '#8B6F5E',
    mapCoords: { x: 56, y: 32 },
    storefrontImage: '/assets/images/poissoniere-1789036940323.png',
    roomImage: '/assets/images/image-1789039959334.png',
    // TODO: replace with owner-confirmed hours — do not invent schedule
    hoursLines: {
      en: [
        'Opening hours — confirm by phone',
        'or on Google Maps',
      ],
      fr: [
        'Horaires — confirmez par téléphone',
        'ou sur Google Maps',
      ],
    },
    metro: {
      en: 'Near Poissonnière / Bonne Nouvelle',
      fr: 'Proche Poissonnière / Bonne Nouvelle',
    },
  },
];

export function getLocation(id: Location['id']): Location {
  const found = locations.find((l) => l.id === id);
  if (!found) throw new Error(`Unknown location: ${id}`);
  return found;
}
