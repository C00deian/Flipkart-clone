"use client";

import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside a CartContextProvider");
    }

    return context;
};
