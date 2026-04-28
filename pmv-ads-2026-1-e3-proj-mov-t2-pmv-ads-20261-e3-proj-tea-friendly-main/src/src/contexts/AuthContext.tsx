import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import * as authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    const result = await authService.signUp(name, email, password);
    if (result.user) setUser(result.user);
    return { error: result.error };
  };

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (result.user) setUser(result.user);
    return { error: result.error };
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updated = await authService.updateProfile(user, updates);
    if (updated) setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
