import "server-only";

import { createServerApi } from "@/app/lib/serverApi";
import { Orders } from "@/app/types/OrderTypes";

export const getOrderServer = async (orderId: string): Promise<Orders> => {
  const api = await createServerApi();
  const res = await api.get<Orders>(`/orders/${orderId}`);
  return res.data;
};
