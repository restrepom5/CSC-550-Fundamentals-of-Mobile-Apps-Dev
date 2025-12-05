import { createContext, useContext, useMemo, useState } from 'react';

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

type AppContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = !!user;

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
      updateUser,
    }),
    [isLoggedIn, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}
