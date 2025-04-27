'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/api';

type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  avatar?: string;
  role: 'ADMIN' | 'FORMATEUR' | 'APPRENANT';
  bio?: string;
  demandeRoleFormateur: boolean;
  motivationFormateur?: string;
  experienceProfessionnelle?: string;
  cvUrl?: string;
  portfolioUrl?: string;
  etatDemande?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/users/me', { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
