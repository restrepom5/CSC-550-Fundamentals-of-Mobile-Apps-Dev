// src/data/parks.js


export const parks = [
  // --- UNIVERSAL ---

  {
    id: 'universal-studios-florida',
    name: 'Universal Studios Florida',
    resort: 'universal',
    type: 'theme',
    image: require('../../assets/attractions/UniversalStudiosFlorida.png'),
    blurb:
      'Movies and TV–inspired rides, including The Wizarding World of Harry Potter – Diagon Alley.',
  },
  {
    id: 'islands-of-adventure',
    name: 'Islands of Adventure',
    resort: 'universal',
    type: 'theme',
    image: require('../../assets/attractions/IslandsOfAdventure.png'),
    blurb:
      'Thrill rides and immersive lands like The Wizarding World of Harry Potter – Hogsmeade.',
  },
  {
    id: 'epic-universe',
    name: 'Epic Universe',
    resort: 'universal',
    type: 'theme',
    image: require('../../assets/attractions/EpicUniverse.png'),
    blurb:
      'New park with lands themed to Harry Potter, Nintendo, How to Train Your Dragon, and more.',
  },
  {
    id: 'volcano-bay',
    name: 'Volcano Bay',
    resort: 'universal',
    type: 'water',
    image: require('../../assets/attractions/VolcanoBay.png'),
    blurb:
      'Tropical water park with slides, lazy river, wave pool, and TapuTapu virtual queue.',
  },
  {
    id: 'universal-citywalk',
    name: 'Universal CityWalk',
    resort: 'universal',
    type: 'entertainment',
    image: require('../../assets/attractions/UniversalCityWalk.png'),
    blurb: 'Dining, shopping, and entertainment district between the Universal parks.',
  },

  // --- DISNEY ---

  {
    id: 'magic-kingdom',
    name: 'Magic Kingdom',
    resort: 'disney',
    type: 'theme',
    image: require('../../assets/attractions/DisneyMagicKingdom.png'),
    blurb: 'Classic Disney park with Cinderella Castle and iconic family attractions.',
  },
  {
    id: 'epcot',
    name: 'Epcot',
    resort: 'disney',
    type: 'theme',
    image: require('../../assets/attractions/DisneyEpcot.png'),
    blurb: 'Future World + World Showcase with food, festivals, and cultural pavilions.',
  },
  {
    id: 'hollywood-studios',
    name: "Disney's Hollywood Studios",
    resort: 'disney',
    type: 'theme',
    image: require('../../assets/attractions/DisneyHollywoodStudios.png'),
    blurb: 'Home to Star Wars: Galaxy’s Edge and Toy Story Land.',
  },
  {
    id: 'animal-kingdom',
    name: "Disney's Animal Kingdom",
    resort: 'disney',
    type: 'theme',
    image: require('../../assets/attractions/DisneyAnimalKingdom.png'),
    blurb: 'Animals, Pandora – The World of Avatar, and unique shows & rides.',
  },
  {
    id: 'typhoon-lagoon',
    name: "Disney's Typhoon Lagoon",
    resort: 'disney',
    type: 'water',
    image: require('../../assets/attractions/DisneyTyphoonLagoon.png'),
    blurb: 'Tropical-themed water park with a huge wave pool and lazy river.',
  },
  {
    id: 'blizzard-beach',
    name: "Disney's Blizzard Beach",
    resort: 'disney',
    type: 'water',
    image: require('../../assets/attractions/DisneyBlizzardBeach.png'),
    blurb: 'Water park themed to a melting ski resort with big slides and family areas.',
  },
  {
    id: 'disney-springs',
    name: "Disney Springs",
    resort: 'disney',
    type: 'entertainment',
    image: require('../../assets/attractions/DisneySprings.png'),
    blurb: 'More than just an outdoor mall, Disney Springs offers a magical atmosphere with something for everyone. From exclusive Disney merchandise and brand-name stores to renowned restaurants and unique experiences like an amphibious car ride, a perfect non-park day destination',  
},
];

// Helpers

export function getParkById(id) {
  return parks.find((p) => p.id === id);
}

// resort: 'disney' | 'universal' | 'both' | null | undefined
export function getParksForResort(resort) {
  if (!resort || resort === 'both') {
    return parks;
  }

  return parks.filter((p) => p.resort === resort);
}

