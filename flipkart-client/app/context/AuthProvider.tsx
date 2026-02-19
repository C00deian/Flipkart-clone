"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getCurrentUser, logoutUser } from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";
import { CurrentUser } from "@/app/types/User";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  // 1. useCallback ensures function reference remains stable across renders
  const fetchUser = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 2. Stable Refresh Function
  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    await fetchUser();
  }, [fetchUser]);

  // 3. Stable Logout Function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    }
    setCurrentUser(null);
    router.push("/login");
    router.refresh();
    setIsLoading(false);
  }, [router]);

  // 🔥 SENIOR FIX: Memoize the context value
  const contextValue = useMemo(() => ({
    currentUser,
    isLoading,
    refreshUser,
    logout
  }), [currentUser, isLoading, refreshUser, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};