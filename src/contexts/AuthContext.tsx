import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import { savedListingsService } from '@/services/savedListingsService';
import { User, UserRole, RegisterData, LoginData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  toggleSaveListing: (listingId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface ProfileRow {
  id: string;
  name: string;
  role: UserRole;
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  student_id: string | null;
  university: string | null;
  business_name: string | null;
  verification_status: 'pending' | 'verified' | 'rejected' | null;
  created_at: string;
}

function mapUser(session: Session | null, profile: ProfileRow | null): User | null {
  const authUser = session?.user;
  if (!authUser || !profile) return null;
  return {
    id: profile.id,
    name: profile.name,
    email: authUser.email ?? '',
    role: profile.role,
    phone: profile.phone ?? undefined,
    avatar: profile.avatar ?? undefined,
    bio: profile.bio ?? undefined,
    studentId: profile.student_id ?? undefined,
    university: profile.university ?? undefined,
    businessName: profile.business_name ?? undefined,
    verificationStatus: profile.verification_status ?? undefined,
    createdAt: profile.created_at,
  };
}

async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    console.error('fetchProfile error', error);
    return null;
  }
  return (data as ProfileRow) ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Initial session restore + subscribe to auth changes.
  useEffect(() => {
    if (!supabase) {
      setIsLoadingAuth(false);
      return;
    }
    let active = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      const profile = data.session ? await fetchProfile(data.session.user.id) : null;
      if (!active) return;
      setUser(mapUser(data.session, profile));
      setIsLoadingAuth(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // Wrap async work to avoid the onAuthStateChange deadlock.
      (async () => {
        const profile = session ? await fetchProfile(session.user.id) : null;
        if (!active) return;
        setUser(mapUser(session, profile));
        setIsLoadingAuth(false);
      })();
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Authentication is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    const { data: res, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) return { success: false, error: error.message };
    const profile = res.session ? await fetchProfile(res.session.user.id) : null;
    setUser(mapUser(res.session, profile));
    return { success: true };
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Authentication is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    // role lives in app_metadata (user-immutable); the handle_new_user trigger
    // reads it to set profiles.role. Other fields go in user_metadata.
    const { data: res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          phone: data.phone,
          student_id: data.studentId,
          university: data.university,
          business_name: data.businessName,
        },
        appMetadata: { role: data.role },
      },
    });
    if (error) return { success: false, error: error.message };
    if (!res.session) {
      // Email confirmation is off by default, but guard just in case.
      return { success: false, error: 'Check your email to confirm your account before signing in.' };
    }
    const profile = res.session ? await fetchProfile(res.session.user.id) : null;
    setUser(mapUser(res.session, profile));
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
      const current = user;
      if (!current) return { success: false, error: 'Not signed in.' };
      if (!supabase) return { success: false, error: 'Authentication is not configured.' };
      const row: Record<string, unknown> = {};
      if (updates.name !== undefined) row.name = updates.name;
      if (updates.phone !== undefined) row.phone = updates.phone;
      if (updates.avatar !== undefined) row.avatar = updates.avatar;
      if (updates.bio !== undefined) row.bio = updates.bio;
      if (updates.studentId !== undefined) row.student_id = updates.studentId;
      if (updates.university !== undefined) row.university = updates.university;
      if (updates.businessName !== undefined) row.business_name = updates.businessName;

      const { error } = await supabase
        .from('profiles')
        .update(row)
        .eq('id', current.id);
      if (error) return { success: false, error: error.message };

      setUser({ ...current, ...updates });
      return { success: true };
    },
    [user]
  );

  const toggleSaveListing = useCallback(
    async (listingId: string): Promise<void> => {
      const current = user;
      if (!current) return;
      const saved = current.savedListings ?? [];
      const isSaved = saved.includes(listingId);
      // Optimistic update
      setUser({
        ...current,
        savedListings: isSaved
          ? saved.filter((id) => id !== listingId)
          : [...saved, listingId],
      });
      try {
        if (isSaved) {
          await savedListingsService.remove(current.id, listingId);
        } else {
          await savedListingsService.add(current.id, listingId);
        }
      } catch (err) {
        // Revert on failure
        setUser({ ...current, savedListings: saved });
        console.error('toggleSaveListing failed', err);
      }
    },
    [user]
  );

  // Load the student's saved listing ids whenever the user changes.
  useEffect(() => {
    if (!user || !supabase) return;
    if (user.role !== 'student') return;
    let active = true;
    (async () => {
      try {
        const ids = await savedListingsService.listForUser(user.id);
        if (!active) return;
        setUser((prev) => (prev ? { ...prev, savedListings: ids } : prev));
      } catch (err) {
        console.error('load saved listings failed', err);
      }
    })();
    return () => {
      active = false;
    };
  }, [user?.id, user?.role]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoadingAuth, login, register, logout, updateProfile, toggleSaveListing }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
