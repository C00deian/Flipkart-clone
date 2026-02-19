import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCategories } from "@/app/services/product/service";
import { Category } from "@/app/types/ProductFormType";

export const useCategories = () => {
   const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
