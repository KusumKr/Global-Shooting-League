import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';
import { useToast } from '../components/ui/use-toast';
// import { db } from "../../firebase/config";

type UserRole =
  | "shooter"
  | "range_owner"
  | "technical_coach"
  | "dietician"
  | "mental_trainer"
  | "franchise_owner";

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Get user role from custom claims or user metadata
        const role = (user.displayName?.split('|')[1] as UserRole) || "shooter";
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store role in displayName as metadata (you might want to use custom claims instead)
      await updateProfile(user, {
        displayName: `${fullName}|${role}`
      });

      setUser(user);
      setUserRole(role);
      toast({ title: "Account created successfully" });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({ 
        title: "Signup failed", 
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = (user.displayName?.split('|')[1] as UserRole) || "shooter";
      
      setUser(user);
      setUserRole(role);
      toast({ title: "Login successful" });
    } catch (error: any) {
      console.error("Sign-in error:", error);
      toast({ 
        title: "Login failed", 
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserRole(null);
      toast({ title: "Logged out successfully" });
    } catch (error: any) {
      console.error("Sign-out error:", error);
      toast({ 
        title: "Logout failed", 
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute = ({ 
  children, 
  roles 
}: { 
  children: JSX.Element;
  roles: UserRole[];
}) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(userRole!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
