const CategoryItemSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 animate-pulse">
      <div className="h-14 w-14 rounded-b-md bg-gray-200" />
      <div className="h-3 w-14 rounded bg-gray-200" />
    </div>
  );
};

export default CategoryItemSkeleton;
