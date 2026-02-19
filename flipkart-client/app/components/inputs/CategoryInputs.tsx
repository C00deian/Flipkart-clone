'use client';

import Image from "next/image";
import React from "react";
import DummyImagePlaceHolder from "../DummyImagePlaceHolder";

interface CategoryInputsProps {
  selected?: boolean;
  label: string;
  imageUrl: string | null;
  onClick: () => void;
}

const CategoryInputs: React.FC<CategoryInputsProps> = ({
  selected,
  label,
  imageUrl,
  onClick,
}) => {
  const hasValidImage =
    typeof imageUrl === "string" && imageUrl.trim().length > 0;
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl border-2 p-4 flex flex-col items-center gap-2
        cursor-pointer transition
        hover:border-slate-500
        ${selected ? "border-slate-500 bg-slate-50" : "border-slate-200"}
      `}
    >
      <div className="relative w-12 h-12">
        {
          hasValidImage ? (
            <Image
              src={imageUrl}
              alt={label}
              fill
            sizes="48px"
              className="object-contain"
            />
          ) : (
            <DummyImagePlaceHolder />
          )
        }

      </div>

      <div className="font-medium text-sm text-center">
        {label}
      </div>
    </div>
  );
};

export default CategoryInputs;
