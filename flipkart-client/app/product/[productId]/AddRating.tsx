"use client";

import { useState } from "react";
import { Product, Review } from "@/app/types/ProductFormType";
import { addProductReview } from "@/app/services/product/service";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product & { reviews: Review[] };
}

const AddRating: React.FC<AddRatingProps> = ({ product }) => {
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!comment.trim()) {
    toast.error("Comment is required");
    return;
  }

  try {
    setLoading(true);

    await addProductReview(product.id, {
      rating,
      title,
      comment,
    });

    toast.success("Review submitted successfully");
    window.location.reload();

  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Something went wrong";

    toast.error(message);

  } finally {
    setLoading(false);
  }
};


  return (
    <div
      id="add-rating"
      className="mt-12 border rounded-lg p-4 space-y-4 max-w-[720px]"
    >
      <h3 className="text-lg font-semibold">Rate this product</h3>

      {/* Rating */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            onClick={() => setRating(r)}
            className={`text-2xl ${
              r <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Review title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* Comment */}
      <textarea
        placeholder="Write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded px-3 py-2"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default AddRating;
