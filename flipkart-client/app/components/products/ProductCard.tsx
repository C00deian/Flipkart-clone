"use client";
import { Product } from "@/app/types/ProductFormType";
import { formatePrice } from "@/app/utils/formatePrice";
import { truncateText } from "@/app/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import DummyImagePlaceHolder from "../DummyImagePlaceHolder";
import RatingBadge from "./RatingBadge";

interface ProductCardProps {
  product: Product;
}

export const getProductRating = (product: any) => {
  if (!product.reviews || product.reviews.length === 0) {
    return 0;
  }

  const total = product.reviews.reduce(
    (acc: number, item: any) => acc + item.rating,
    0
  );

  return total / product.reviews.length;
};


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


  const router = useRouter();

  return (
    <div onClick={() =>
      router.push(`/product/${product.id}`)
    }
      className="col-span-1
      cursor-pointer
      border-[1.2px]
      border-slate-200
      bg-slate-50
      rounded-sm
      p-2
      transition
      hover:scale-103
      text-center
      tex-sm
      mt-4
      "
    >
      <div
        className="
          flex flex-col
          items-center
          w-full
          
          "
      >
        <div className="aspect-square overflow-hidden relative w-full">
          {
            product.images[0].imageUrl ? (
              <Image
                fill
                src={product.images[0].imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <DummyImagePlaceHolder />
            )
          }

        </div>
        <div className="mt-3">{truncateText(product.name)}</div>
        <RatingBadge
  rating={getProductRating(product)}
          reviewCount={product.reviews.length}
          
/> 
        <div className="font-semibold">{formatePrice(product.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
