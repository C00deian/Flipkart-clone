"use client";

import { Category } from "@/app/types/ProductFormType";
import Image from "next/image";
import DummyImagePlaceHolder from "../DummyImagePlaceHolder";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryProps {
  item: Category;
}

const CategoryItem: React.FC<CategoryProps> = ({ item }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const isActive = activeCategory === item.slug;

  const hasValidImage =
    typeof item.imageUrl === "string" && item.imageUrl.trim().length > 0;

  const handleClick = () => {
    if (!item.slug) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", item.slug);

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group flex flex-col items-center cursor-pointer min-w-[90px]
        transition
        ${isActive ? "text-blue-600" : "text-gray-700"}
      `}
    >
      {/* Image */}
      <div
        className={`
          relative w-16 h-16 transition-transform duration-300
          group-hover:scale-110
          ${isActive ? "scale-110" : ""}
        `}
      >
        {hasValidImage ? (
          <Image
            src={item.imageUrl as string}
            alt={item.slug}
            fill
            sizes="48px"
            className="object-contain"
          />
        ) : (
          <DummyImagePlaceHolder />
        )}
      </div>

      {/* Text */}
      <span
        className={`
          mt-2 text-sm font-medium
          ${isActive ? "border-b-2 border-blue-600" : ""}
        `}
      >
        {item.name}
      </span>
    </div>
  );
};

export default CategoryItem;
