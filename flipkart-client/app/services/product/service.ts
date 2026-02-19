import { publicApi, securedApi } from "@/app/lib/ClientUrlBase";
import { Category, Product, Review } from "@/app/types/ProductFormType";
import { ApiResponse } from "@/app/types/User";

export type GetProductsParams = {
  categorySlug?: string;
};

export interface AddReviewPayload {
  rating: number;
  title: string;
  comment: string;
}

export const getAllProducts = async (
  params?: GetProductsParams
): Promise<Product[]> => {
  const res = await publicApi.get<ApiResponse<Product[]>>("/products", {
    params,
  });

  return res.data.data;
};


export const getProduct = async (id: string): Promise<Product> => {
  const res = await publicApi.get<ApiResponse<Product>>(`/products/${id}`);
  return res.data.data;
};

export const addProductReview = async (
  productId: number,
  payload: AddReviewPayload
): Promise<Review> => {
  const res = await securedApi.post<Review>(
    `/products/${productId}/reviews`,
    payload
  );

  return res.data;
};



export const getCategories = async (): Promise<Category[]> => {
  const res = await publicApi.get<Category[]>("/products/categories");

  // TanStack Query rule: NEVER undefined
  return res.data ?? [];
};


