import { Pet, Species } from '../types';

export const BREEDS = {
  cats: ['Persian', 'Siamese', 'Maine Coon', 'Ragdoll', 'Sphynx'],
  dogs: ['Labrador', 'Golden Retriever', 'Beagle', 'Bulldog', 'Poodle'],
  bunnies: ['Lionhead', 'Dutch', 'Rex', 'Flemish Giant', 'Lop'],
  fish: ['Goldfish', 'Betta', 'Guppy', 'Angelfish', 'Molly'],
};

const speciesImages: Record<Species, any> = {
  Cats: require('../assets/images/cat1.jpg'),
  Dogs: require('../assets/images/dog1.jpeg'),
  Bunnies: require('../assets/images/bunny1.webp'),
  Fish: require('../assets/images/fish1.jpg'),
};


const petNames = ['Bella', 'Charlie', 'Luna', 'Max', 'Milo', 'Lucy', 'Daisy', 'Buddy'];

export function samplePetsForBreed(species: Species, breed: string): Pet[] {
  const images: Record<Species, any> = {
    Cats: require('../assets/images/cat1.jpg'),
    Dogs: require('../assets/images/dog1.jpeg'),
    Bunnies: require('../assets/images/bunny1.webp'),
    Fish: require('../assets/images/fish1.jpg'),
  };
  const image = images[species];

  return Array.from({ length: 6 }).map((_, i): Pet => ({
    id: `${species}-${breed}-${i}`,
    name: ['Bella', 'Charlie', 'Luna', 'Max', 'Milo', 'Lucy', 'Daisy', 'Buddy'][i % 8],
    age: `${1 + (i % 5)} yrs`,
    sex: i % 2 === 0 ? 'male' : 'female',
    thumbnail: image,
    breedId: `${species}-${breed}`,
    breedName: breed,
    species,
    description: `${breed} ${species} who is friendly and ready for a new home.`,
  }));
}
