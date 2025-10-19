export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  highlights: string[];
  price: string; // rough budget label
};

export const DESTINATIONS: Destination[] = [
  {
    id: "accra",
    name: "Accra",
    country: "Ghana",
    image: "https://images.unsplash.com/photo-1727023663928-1772e2c7e679?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    description: "Ghana welcomes you with warm, kind-hearted people, a deep well of traditional history, and the vibrant artistry of kente cloth woven stories in color.",
    highlights: ["Makola Market", "Labadi Beach", "Kwame Nkrumah Memorial"],
    price: "$"
  },
  {
    id: "montego-bay",
    name: "Montego Bay",
    country: "Jamaica",
    image: "https://images.unsplash.com/photo-1558031715-5c8d48b508bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9udGVnbyUyMGJheSUyMGphbWFpY2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
    description: "Jamaica pulses with easygoing warmth—turquoise bays, reggae rhythms, and cuisine that hugs the soul.",
    highlights: ["Doctor’s Cave Beach", "Rose Hall", "Martha Brae Rafting"],
    price: "$$"
  },
  {
    id: "willemstad",
    name: "Willemstad",
    country: "Curaçao",
    image: "https://images.unsplash.com/photo-1705094264181-6a35705f2dc9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lsbGVtc3RhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900p",
    description: "Curaçao charms with candy-colored waterfronts, crystal-clear reefs, and a relaxed Dutch-Caribbean vibe.",
    highlights: ["Queen Emma Bridge", "Klien Curaçao", "Mambo Beach"],
    price: "$$$"
  },
  {
    id: "newyork",
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1449356669056-f1c1e6e56b0f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWFua2VlJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    description: "Skyscrapers, Broadway shows, and iconic neighborhoods.",
    highlights: ["Central Park", "Times Square", "Yankee Stadium"],
    price: "$$$"
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1996",
    description: "Ancient history meets vibrant street life and cuisine.",
    highlights: ["Colosseum", "Trevi Fountain", "Vatican City"],
    price: "$$"
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    image: "https://images.unsplash.com/photo-1599407384144-77deae48a47a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    description: "Dramatic coastlines, Table Mountain, and world-class wine country.",
    highlights: ["Table Mountain", "Cape Point", "V&A Waterfront"],
    price: "$$"
  }
];
