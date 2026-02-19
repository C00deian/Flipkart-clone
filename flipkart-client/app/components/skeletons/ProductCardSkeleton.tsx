const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-sm shadow-sm p-3 animate-pulse">
      {/* Image */}
      <div className="h-40 bg-gray-200 rounded mb-3" />

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />

      {/* Rating */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />

      {/* Price */}
      <div className="h-5 bg-gray-300 rounded w-1/2" />
    </div>
  );
};

export default ProductCardSkeleton;
