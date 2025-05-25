import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { useToast } from "@/components/ui/use-toast";
import { Navigate, useLocation } from "react-router-dom";

export type UserRole =
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

  // Add network connectivity check
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (!isOnline) {
        toast({ title: "No internet connection", variant: "destructive" });
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error && error.message !== "Auth session missing!") {
          console.error("Error fetching user:", error.message);
          toast({ title: "Session error", description: error.message, variant: "destructive" });
        }

        if (user) {
          const role = (user.user_metadata?.role as UserRole) || "shooter";
          setUser(user);
          setUserRole(role);
          // Consider using secure storage instead of localStorage
          localStorage.setItem("sb_user", JSON.stringify(user));
          localStorage.setItem("sb_user_role", role);
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        try {
          if (session?.user) {
            const role = (session.user.user_metadata?.role as UserRole) || "shooter";
            setUser(session.user);
            setUserRole(role);
            localStorage.setItem("sb_user", JSON.stringify(session.user));
            localStorage.setItem("sb_user_role", role);
            
            if (event === "SIGNED_IN") {
              toast({ title: "Welcome back!", description: "Login successful" });
            }
          } else {
            setUser(null);
            setUserRole(null);
            localStorage.removeItem("sb_user");
            localStorage.removeItem("sb_user_role");
          }
        } finally {
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [toast, isOnline]);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
  ): Promise<void> => {
    if (!isOnline) {
      toast({ title: "No internet connection", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || "Registration failed");
      }

      if (!data.user) {
        throw new Error('Registration failed: No user data received');
      }

      setUser(data.user);
      setUserRole(role);
      toast({ title: "Check your email!", description: "Verification link sent" });
      
    } catch (error: any) {
      console.error('Signup error:', error);
      const message = error.message.includes('fetch') 
        ? "Network error - check internet connection" 
        : error.message;
      toast({ title: "Signup failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    if (!isOnline) {
      toast({ title: "No internet connection", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("Authentication failed");

      const role = (data.user.user_metadata?.role as UserRole) || "shooter";
      setUser(data.user);
      setUserRole(role);
      toast({ title: "Login successful" });
    } catch (error: any) {
      console.error("Sign-in error:", error);
      const message = error.message.includes('Invalid') 
        ? "Invalid email or password" 
        : error.message;
      toast({ title: "Login failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole(null);
      toast({ title: "Logged out successfully" });
    } catch (error: any) {
      console.error("Sign-out error:", error);
      toast({ title: "Logout failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
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