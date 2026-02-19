import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllProducts } from "@/app/services/product/service";
import { Product } from "@/app/types/ProductFormType";

type GetProductsParams = {
  categorySlug?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const useProducts = (params?: GetProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllProducts(params);

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products", err);

        if (isMounted) {
          setError("Failed to load products");
          toast.error("Failed to load products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [
    params?.categorySlug,
    params?.brand,
    params?.minPrice,
    params?.maxPrice,
  ]);

  return { products, loading, error };
};
