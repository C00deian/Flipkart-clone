"use client";

import { useRouter, useSearchParams } from "next/navigation";


const AllCategoryItem = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isActive = !searchParams.get("category");

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");

    const query = params.toString();
    router.push(query ? `/?${query}` : "/", { scroll: false });
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
      {/* Circle / Icon */}
      <div
        className={`
          w-16 h-16 flex items-center justify-center rounded-full
          bg-gray-100 font-semibold
          ${isActive ? "ring-2 ring-blue-600" : ""}
        `}
      >
        All
      </div>

      {/* Label */}
      <span
        className={`
          mt-2 text-sm font-medium
          ${isActive ? "border-b-2 border-blue-600" : ""}
        `}
      >
        All
      </span>
    </div>
  );
};

export default AllCategoryItem;
