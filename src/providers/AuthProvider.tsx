import { onAuthStateChanged } from "firebase/auth";

import { userService } from "@/features/users/services/userService";
import { authService } from "@/features/auth/services/authService";

import { createContext, useEffect, useState } from "react";

import { auth } from "@/firebase/auth";

import type { AppUser } from "@/types/user";

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AppUser | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.handleGoogleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);

        return;
      }

      const appUser = await userService.getUser(firebaseUser.uid);

      setUser(appUser);

      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) return;

    const appUser = await userService.getUser(firebaseUser.uid);

    setUser(appUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
