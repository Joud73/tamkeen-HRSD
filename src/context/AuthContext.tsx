import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type ProfileStatus = "pending_verification" | "profile_incomplete" | "active";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profileStatus: ProfileStatus | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, organizationName?: string, registrationNumber?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfileStatus: (status: ProfileStatus) => Promise<{ error: string | null }>;
  refreshProfileStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus | null>(null);

  const fetchProfileStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile status:", error);
      return null;
    }
    return data?.status as ProfileStatus | null;
  };

  const refreshProfileStatus = async () => {
    if (user) {
      const status = await fetchProfileStatus(user.id);
      setProfileStatus(status);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch profile status
          const status = await fetchProfileStatus(session.user.id);
          setProfileStatus(status);
        } else {
          setProfileStatus(null);
        }

        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const status = await fetchProfileStatus(session.user.id);
        setProfileStatus(status);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  };

  const signUp = async (
    email: string,
    password: string,
    organizationName?: string,
    registrationNumber?: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      return { error: error.message };
    }

    // Create profile with pending_verification status
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: email,
        organization_name: organizationName || null,
        registration_number: registrationNumber || null,
        status: "pending_verification",
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        return { error: "حدث خطأ أثناء إنشاء الحساب" };
      }
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfileStatus(null);
  };

  const updateProfileStatus = async (status: ProfileStatus) => {
    if (!user) {
      return { error: "لا يوجد مستخدم مسجل" };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ status })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile status:", error);
      return { error: "حدث خطأ أثناء تحديث حالة الحساب" };
    }

    setProfileStatus(status);
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    profileStatus,
    signIn,
    signUp,
    signOut,
    updateProfileStatus,
    refreshProfileStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
