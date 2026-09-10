export interface Location {
  id: string;
  name: string;
  fullName: string;
  address: string;
  arrondissement: string;
  phone: string;
  url: string;
  personality: string[];
  description: string;
  color: string;
  mapCoords: { x: number; y: number };
}

export const locations: Location[] = [
  {
    id: 'montmartre',
    name: 'Montmartre',
    fullName: 'MOMO HOUSE MONTMARTRE',
    address: '85 Rue Montmartre',
    arrondissement: '75002 Paris',
    phone: '+33 9 77 48 77 25',
    url: 'https://momo-house-montmartre.fr/',
    personality: ['ARTISTIC', 'CLASSIC', 'WARM'],
    description: 'The original house. Parisian soul.',
    color: '#C4714A',
    mapCoords: { x: 48, y: 38 },
  },
  {
    id: 'poissonniere',
    name: 'Poissonnière',
    fullName: 'MOMO HOUSE POISSONNIÈRE',
    address: '46 Rue Poissonnière',
    arrondissement: '75010 Paris',
    phone: '+33 1 42 36 57 21',
    url: 'https://momo-house.fr/',
    personality: ['URBAN', 'STREET', 'LIVELY'],
    description: 'Street energy. Contemporary spirit.',
    color: '#8B6F5E',
    mapCoords: { x: 56, y: 32 },
  },
];