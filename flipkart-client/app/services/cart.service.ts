import { securedApi } from "../lib/ClientUrlBase";
import { CartDto , CartItemDto } from "../types/CartProductTypes";

// Create cart
export const createCart = async (): Promise<CartDto> => {
  const res = await securedApi.post<CartDto>("/carts");
  return res.data;
};

// Add item
export const addItemToCart = async (
  productId: number,
  quantity = 1
): Promise<CartItemDto> => {
  const res = await securedApi.post<CartItemDto>(
    '/carts/items',
    { productId, quantity }
  );
  return res.data;
};

export const decreaseItemQty = async (productId: number) => {
  await securedApi.patch(`/carts/items/${productId}/decrease`);
};

export const increaseItemQty = async (productId: number) => {
  await securedApi.patch(`/carts/items/${productId}/increase`);
};

export const removeItemFromCart = async (productId: number) => {
  await securedApi.delete(`/carts/items/${productId}`);
};

export const clearCart = async () => {
  await securedApi.delete("/carts/items");
}

export const getMyCart = async () => {
  const res = await securedApi.get("/carts/me");
  return res.data;
};
