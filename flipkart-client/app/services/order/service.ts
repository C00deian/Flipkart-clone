import { securedApi } from "@/app/lib/ClientUrlBase";
import type { Orders } from "@/app/types/OrderTypes";

export const getMyOrders = async (): Promise<Orders[]> => {
  const res = await securedApi.get<Orders[]>("/orders");
  return res.data;
};

export const getMyOrder = async (orderId: string): Promise<Orders> => {
  const res = await securedApi.get<Orders>(`/orders/${orderId}`);
  return res.data;
};

