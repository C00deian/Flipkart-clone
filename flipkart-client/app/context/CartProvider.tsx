"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { CartContext } from "./CartContext";
import { CartContextType } from "@/app/types/CartContextType";
import {
  CartItemType,
  CartProductType,
} from "@/app/types/CartProductTypes";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

import {
  addItemToCart,
  getMyCart,
  removeItemFromCart,
  clearCart,
  decreaseItemQty,
} from "@/app/services/cart.service";

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  const auth = useContext(AuthContext);
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([]);
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);

  const clearCartState = useCallback(() => {
    setCartId(null);
    setCartProducts([]);
    setCartTotalQty(0);
    setCartTotalAmount(0);
  }, []);

  /* ======================================================
     🔁 Reload Cart (SINGLE SOURCE OF TRUTH)
     ====================================================== */
  const reloadCart = useCallback(async () => {
    try {
      const cart = await getMyCart();

       setCartId(cart.id);

      const mappedItems: CartItemType[] = cart.items.map((item: any) => ({
        productId: item.productId,
        name: item.productName,
        image: item.productImage,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }));

      setCartProducts(mappedItems);
    } catch (error) {
      clearCartState();
    }
  }, [clearCartState]);

  /* ======================================================
     🟢 ADD PRODUCT
     ====================================================== */
  const handleAddProductToCart = useCallback(
    async (product: CartProductType) => {
      try {
        await addItemToCart(product.id, 1);
        await reloadCart();
        toast.success("Product added to cart");
      } catch {
        toast.error("Failed to add product");
      }
    },
    [reloadCart]
  );

  /* ======================================================
     🔴 REMOVE SINGLE ITEM
     ====================================================== */
  const handleRemoveProductFromCart = useCallback(
    async (item: CartItemType) => {
      try {
        await removeItemFromCart(item.productId);
        await reloadCart();
        toast.success("Product removed");
      } catch {
        toast.error("Failed to remove product");
      }
    },
    [reloadCart]
  );

  /* ======================================================
     ➕ INCREASE QUANTITY
     ====================================================== */
  const handleCartQtyIncrease = useCallback(
    async (item: CartItemType) => {
      if (item.quantity >= 49) {
        toast.error("Maximum quantity reached");
        return;
      }

      try {
        await addItemToCart(item.productId, 1);
        await reloadCart();
      } catch {
        toast.error("Failed to increase quantity");
      }
    },
    [reloadCart]
  );

  /* ======================================================
     ➖ DECREASE QUANTITY
     ====================================================== */
  const handleCartQtyDecrease = useCallback(
    async (item: CartItemType) => {
      if (item.quantity <= 1) {
        toast.error("Minimum quantity reached");
        return;
      }

      try {
        await decreaseItemQty(item.productId);
        await reloadCart();
      } catch {
        toast.error("Failed to decrease quantity");
      }
    },
    [reloadCart]
  );

  /* ======================================================
     🧹 CLEAR CART
     ====================================================== */
  const handleClearCart = useCallback(async () => {
    try {
      await clearCart();
      clearCartState();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  }, [clearCartState]);

  /* ======================================================
     🔄 INITIAL LOAD
     ====================================================== */
  useEffect(() => {
    if (!auth || auth.isLoading) return;

    // Cart is session-backed (cookie auth). Keep public pages public by
    // only fetching the cart once we know the user is logged in.
    if (!auth.currentUser) {
      clearCartState();
      return;
    }

    reloadCart();
  }, [auth, clearCartState, reloadCart]);

  /* ======================================================
     🧮 TOTALS CALCULATION
     ====================================================== */
  useEffect(() => {
    const { total, qty } = cartProducts.reduce(
      (acc, item) => {
        acc.total += (item.unitPrice ?? 0) * (item.quantity ?? 0);
        acc.qty += item.quantity ?? 0;
        return acc;
      },
      { total: 0, qty: 0 }
    );

    setCartTotalAmount(total);
    setCartTotalQty(qty);
  }, [cartProducts]);

  /* ======================================================
     📦 CONTEXT VALUE
     ====================================================== */
  const value: CartContextType = {
    cartId,
    cartProducts,
    cartTotalQty,
    cartTotalAmount,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
