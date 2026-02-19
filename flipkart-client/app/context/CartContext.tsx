"use client";

import { createContext } from "react";
import { CartContextType } from "@/app/types/CartContextType";

export const CartContext = createContext<CartContextType | null>(null);
