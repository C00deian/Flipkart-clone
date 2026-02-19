'use client';

import { useQuery } from "@tanstack/react-query";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import AllCategoryItem from "./AllCategoryItem";
import CategoriesSkeleton from "../skeletons/CategoriesSkeleton";
import { getCategories } from "@/app/services/product/service";
import { Category } from "@/app/types/ProductFormType";

const Categories = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <Container>
        <CategoriesSkeleton />
      </Container>
    );
  }

  if (isError || categories.length === 0) {
    return null;
  }

  return (
    <Container>
          <div className="flex items-center p-4 justify-between overflow-x-auto scrollbar-hide flex-row bg-white my-2">
        <AllCategoryItem />
        {categories.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
