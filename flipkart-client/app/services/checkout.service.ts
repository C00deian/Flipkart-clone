import { securedApi } from "../lib/ClientUrlBase";

export type CheckoutStartResponse = {
  orderId: string;
  checkoutUrl: string;
};

export const checkout = async (cartId: string): Promise<CheckoutStartResponse> => {
  const res = await securedApi.post<CheckoutStartResponse>("/checkout", { cartId });
  return res.data;
};
