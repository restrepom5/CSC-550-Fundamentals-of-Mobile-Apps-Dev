export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  bookclubId?: number;
  profileImage?: string;
};

export type Books = {
  id: number;
  title: string;
  bookclubId: number;
  googleId: string;
  readingStatus: 'reading' | 'finished';
  finishedDate?: Date;
  rating?: number;
};

export type Bookclub = {
  id: number;
  name: string;
};

export type GoogleBook = {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  thumbnail?: string;
  smallThumbnail?: string;
  pageCount?: number;
  publishedDate?: string;
};
