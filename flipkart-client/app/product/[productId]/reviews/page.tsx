"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddRating from "../AddRating";
import { getProduct } from "@/app/services/product/service";
import { Product } from "@/app/types/ProductFormType";

export default function AddRatingPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return;

    getProduct(productId)
      .then(setProduct)
      .catch(console.error);
  }, [productId]);

  if (!product) {
    return <div className="mt-12 text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-12 px-4">
      <AddRating product={product} />
    </div>
  );
}
