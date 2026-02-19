import { securedApi } from "@/app/lib/ClientUrlBase";

import type { Orders } from "@/app/types/OrderTypes";
import type {
  CategoryFormType,
  ProductFormType,
} from "@/app/types/ProductFormType";

export const getAllOrders = async (): Promise<Orders[]> => {
  const res = await securedApi.get<Orders[]>("/admin/orders");
  return res.data;
};


export const getOrder = async (orderId: string): Promise<Orders> => {
  const res = await securedApi.get<Orders>(`/admin/orders/${orderId}`);
  return res.data;
};

export const dispatchOrder = async (id: string) => {
  const res = await securedApi.put(`/admin/orders/${id}/dispatch`);
  return res.data;
};

export const deliverOrder = async (id: string) => {
  const res = await securedApi.put(`/admin/orders/${id}/deliver`);
  return res.data;
};

export const addProduct = async (
  data: ProductFormType,
): Promise<ProductFormType> => {
  const res = await securedApi.post<ProductFormType>("/products/add-product", data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await securedApi.delete(`/products/${id}`);
  return res.data;
};

export const toggleStockStatus = async (id: number) => {
  const res = await securedApi.put(`/products/${id}/stock`);
  return res.data;
};

export const addCategory = async (
  data: CategoryFormType,
): Promise<CategoryFormType> => {
  const res = await securedApi.post<CategoryFormType>(
    "/products/add-category",
    data,
  );
  return res.data;
};
