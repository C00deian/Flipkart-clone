import CategoryItemSkeleton from "./CategoryItemSkeleton";

const CategoriesSkeleton = () => {
  return (
             <div className="flex items-center p-4 justify-between overflow-x-auto scrollbar-hide flex-row bg-white my-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <CategoryItemSkeleton key={i} />
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
