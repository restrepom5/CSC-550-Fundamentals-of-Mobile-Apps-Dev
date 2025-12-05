import { Bookclub, Books, User } from '@/src/context/provider';

export const users: User[] = [
  {
    id: 1,
    name: 'Tiffany Choe',
    email: 'choet1@southernct.edu',
    username: 'tchoe',
    password: 'password',
  },
];

export const books: Books[] = [
  {
    id: 1,
    title: 'Katabasis',
    bookclubId: 1,
    readingStatus: 'reading',
    finishedDate: new Date('2025-12-31'),
    googleId: 'Nlf8EAAAQBAJ',
  },
  {
    id: 2,
    title: 'Galaxy Explorers',
    bookclubId: 1,
    readingStatus: 'finished',
    finishedDate: new Date('2024-04-12'),
    googleId: 'zyTCAlFPjgYC',
    rating: 5,
  },
];

export const bookclubs: Bookclub[] = [
  {
    id: 1,
    name: 'Little Readers Club',
  },
  {
    id: 2,
    name: 'Adventure Explorers',
  },
  {
    id: 3,
    name: 'Fantasy Friends',
  },
];
