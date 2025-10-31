export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  price: string;
  tags: string[];
  description: string;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    price: "$$",
    tags: ["beach", "islands", "romantic"],
    description:
      "Cliffside villages, stunning sunsets, and azure waters. Perfect for a dreamy escape.",
  },
  {
    id: "2",
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    price: "$$",
    tags: ["culture", "temples", "food"],
    description:
      "Historic temples, tea houses, and tranquil gardens — a cultural time capsule.",
  },
  {
    id: "3",
    name: "Banff",
    country: "Canada",
    image:
      "https://images.unsplash.com/photo-1508261303786-0e3b76d4b5c6?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    price: "$",
    tags: ["mountains", "lakes", "hiking"],
    description:
      "Turquoise lakes and alpine peaks. Outdoorsy paradise in the Canadian Rockies.",
  },
];


