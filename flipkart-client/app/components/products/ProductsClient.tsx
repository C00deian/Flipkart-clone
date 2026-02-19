'use client';

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/app/services/product/service";
import ProductCard from "./ProductCard";
import NullData from "../NullData";
import ProductsGridSkeleton from "../skeletons/ProductsGridSkeleton";

const ProductsClient = () => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", categorySlug],
    queryFn: () => getAllProducts({ categorySlug }),
    placeholderData: (prev) => prev
  });

  if (isLoading) return <ProductsGridSkeleton />;

  if (isError) {
    return (
      <NullData
        title={(error as any)?.message || "Something went wrong"}
      />
    );
  }

  if (!products.length) {
    return (
      <p className="text-center">
        Oops! No products found. Click "All" to clear filters.
      </p>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      "
    >
      {products.map((product: any) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsClient;
