import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, RegisterData, LoginData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toggleSaveListing: (listingId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'campus_nest_users';
const SESSION_KEY = 'campus_nest_session';

// Seed default admin account
const DEFAULT_ADMIN: User & { password: string } = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@campusnest.ac.mw',
  role: 'admin',
  createdAt: new Date().toISOString(),
  password: 'admin123',
};

function getStoredUsers(): Array<User & { password: string }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const users = raw ? JSON.parse(raw) : [];
    // Ensure admin always exists
    if (!users.find((u: User) => u.email === DEFAULT_ADMIN.email)) {
      users.push(DEFAULT_ADMIN);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [DEFAULT_ADMIN];
  }
}

function saveUsers(users: Array<User & { password: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Restore session on mount
    getStoredUsers(); // ensure admin seeded
    try {
      const sessionId = localStorage.getItem(SESSION_KEY);
      if (sessionId) {
        const users = getStoredUsers();
        const found = users.find((u) => u.id === sessionId);
        if (found) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _p, ...userWithoutPass } = found;
          setUser(userWithoutPass as User);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const login = useCallback(async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password
    );
    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...userWithoutPass } = found;
    setUser(userWithoutPass as User);
    localStorage.setItem(SESSION_KEY, found.id);
    return { success: true };
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User & { password: string } = {
      id: `${data.role}-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      studentId: data.studentId,
      university: data.university,
      businessName: data.businessName,
      verificationStatus: data.role === 'landlord' ? 'pending' : undefined,
      savedListings: [],
      createdAt: new Date().toISOString(),
      password: data.password,
    };
    users.push(newUser);
    saveUsers(users);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...userWithoutPass } = newUser;
    setUser(userWithoutPass as User);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      // Persist to stored users
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === prev.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        saveUsers(users);
      }
      return updated;
    });
  }, []);

  const toggleSaveListing = useCallback((listingId: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const saved = prev.savedListings ?? [];
      const updated = saved.includes(listingId)
        ? saved.filter((id) => id !== listingId)
        : [...saved, listingId];
      const newUser = { ...prev, savedListings: updated };
      // Persist
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === prev.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], savedListings: updated };
        saveUsers(users);
      }
      return newUser;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoadingAuth, login, register, logout, updateProfile, toggleSaveListing }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
