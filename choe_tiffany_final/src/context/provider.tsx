import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isLoading: boolean;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user session', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const updateUser = async (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newUser = { ...prev, ...updates };
      AsyncStorage.setItem('user', JSON.stringify(newUser)).catch((err) =>
        console.error('Failed to update user in storage', err),
      );
      return newUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateUser,
      isLoading,
    }),
    [user, isLoading],
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
