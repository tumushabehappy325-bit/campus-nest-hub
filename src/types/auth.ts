export type UserRole = 'student' | 'landlord' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Student fields
  studentId?: string;
  university?: string;
  phone?: string;
  bio?: string;
  savedListings?: string[];
  // Landlord fields
  businessName?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  verificationDocs?: string[];
  // Shared
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  studentId?: string;
  university?: string;
  businessName?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
