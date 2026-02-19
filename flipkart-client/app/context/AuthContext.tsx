"use client";

import { createContext } from "react";
import { CurrentUser } from "@/app/types/User";

export interface AuthContextType {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
