

import Link from "next/link";
import { Heading } from "@/app/components/Heading";
import { Review } from "@/app/types/ProductFormType";
import { maskUserId } from "@/app/utils/masked";
import Rating from "@mui/material/Rating";
import moment from "moment";

interface ListRatingProps {
  reviews: Review[];
  productId: string;
}

export const ListRating: React.FC<ListRatingProps> = ({
  reviews,
  productId,
}) => {
  

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading title="Ratings & Reviews" />

        <Link
          href={`/product/${productId}/reviews`}
          className="
            border
            border-blue-600
            text-blue-600
            text-sm
            font-medium
            px-4
            py-1.5
            rounded-sm
            hover:bg-blue-50
          "
        >
          Rate Product
        </Link>
      </div>

      {/* Reviews list */}
      <div className="flex flex-col gap-8 mt-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 max-w-[720px]">
            <div className="flex items-center gap-3">
              <Rating value={review.rating} readOnly size="small" />
              <span className="font-semibold text-sm">
                {review.title?.trim() || "Best in the market!"}
              </span>
            </div>

            <p className="text-sm text-gray-800 mt-2">
              {review.comment}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
              <span className="font-medium text-gray-700">
                {maskUserId(review.userId)}
              </span>

              {review.isVerifiedPurchase && (
                <span className="text-green-600 font-medium">
                  ✔ Certified Buyer
                </span>
              )}

              <span>
                {moment(review.createdAt).format("MMM, YYYY")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
