// constants/categories.ts

export type CategoryConfig = {
  key: string;
  label: string;
  icon: string;
  target: number; // 💰 goal amount for this category
};

export const CATEGORIES: CategoryConfig[] = [
  {
    key: "food",
    label: "Food",
    icon: "fast-food-outline",
    target: 300,
  },
  {
    key: "rent",
    label: "Rent",
    icon: "home-outline",
    target: 3000,
  },
  {
    key: "utilities",
    label: "Utilities",
    icon: "flash-outline",
    target: 500,
  },
  {
    key: "emergency",
    label: "Emergency Fund",
    icon: "alert-circle-outline",
    target: 5000,
  },
  {
    key: "investments",
    label: "Investments",
    icon: "trending-up-outline",
    target: 500,
  },
];
