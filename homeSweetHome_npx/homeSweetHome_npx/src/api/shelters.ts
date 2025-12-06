import { Pet, Breed, Shelter, AdoptionForm, Species } from '../types';
import { BREEDS, samplePetsForBreed } from '../utils/breeds';
import  axios  from 'axios';

// Mock breeds by species
export const fetchBreedsBySpecies = async (species: Species): Promise<Breed[]> => {
  const breedNames = BREEDS[species.toLowerCase() as keyof typeof BREEDS] || [];
  return breedNames.map((name: string, i: number) => ({
    id: `${species}-${i}`,
    name,
    species,
  }));
};

// Mock pets by breed
export const fetchPetsByBreed = async (breedId: string): Promise<Pet[]> => {
  const [speciesStr, breedIndexStr] = breedId.split('-');
  const species = speciesStr as Species;
  const breedList = BREEDS[species.toLowerCase() as keyof typeof BREEDS] || [];
  const breedName = breedList[parseInt(breedIndexStr)] || 'Unknown';

  return samplePetsForBreed(species, breedName);
};

// Api for shelters
export const fetchShelters = async (): Promise<Shelter[]> => {
  try {
    const response = await axios.post('http://localhost:3000/shelters', {
      lat: 40.7128,
      lng: -74.0060
    });
  return response.data;
  } catch (error) {
    console.error('Failed to fetch shelters:', error);
    return []; // empty array on error
  }
};

// Mock adoption submission
export const submitAdoption = async (form: AdoptionForm) => {
  console.log('Mock submission:', form);
  return { success: true, message: 'Form submitted successfully' };
};
