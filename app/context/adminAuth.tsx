'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}


const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);
/*
El auth de los administradores DEBERIA de manejarse como server actions pero por simplicidad ( y porque ya lo hice asi y me da flojera cambiarlo) quedara como deuda tecnica.
*/
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsHydrated(true);
  }, []);

  const login = (password: string): boolean => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  if (!isHydrated) {
    return (
      <AdminAuthContext.Provider value={{ isAuthenticated: false, isHydrated: false, login, logout }}>
        {children}
      </AdminAuthContext.Provider>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isHydrated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
