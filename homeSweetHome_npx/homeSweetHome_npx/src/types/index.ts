export type Species = 'Cats' | 'Dogs' | 'Bunnies' | 'Fish';

export interface Breed {
  id: string;
  name: string;
  species: Species;
}

export interface Pet {
  id: string;
  name: string;
  age: string;
  sex: 'male' | 'female';
  thumbnail: string;
  breedId: string;
  breedName: string;
  species: Species;
  description?: string;
}

export interface Shelter {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
}

export interface AdoptionForm {
  petId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  job?: string;
  haveKids: boolean;
  why: string;
  photoUri?: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Species: { species: Species };
  Breed: { species: Species; breed: Breed };
  PetList: { breed: Breed };
  PetDetail: { pet: Pet };
  AdoptForm: { pet: Pet };
  Tabs: undefined;
};
