import "server-only";

import { createServerApi } from "@/app/lib/serverApi";
import { Product } from "@/app/types/ProductFormType";
import { ApiResponse } from "@/app/types/User";

export const getProductServer = async (id: string): Promise<Product> => {
  const api = await createServerApi();
  const res = await api.get<ApiResponse<Product>>(`/products/${id}`);
  return res.data.data;
};
