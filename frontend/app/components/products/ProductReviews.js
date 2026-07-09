"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import useCanReview from "@/app/hooks/useCanReview";

import useReviews from "@/app/hooks/useReviews";
import { createReview } from "@/services/reviewService";

export default function ProductReviews({ product }) {
  const queryClient = useQueryClient();

  const {
    data: reviews = [],
    isPending,
  } = useReviews(product._id);
  const {
  data: canReview = false,
} = useCanReview(product._id);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const reviewMutation = useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      toast.success("Review added!");

      setComment("");
      setRating(5);

      queryClient.invalidateQueries({
        queryKey: ["reviews", product._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", product._id],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit review."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    reviewMutation.mutate({
      productId: product._id,
      rating,
      comment,
    });
  };

  return (
    <section className="mt-16 rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-3xl font-bold">
        Reviews
      </h2>

      <div className="mb-8 flex items-center gap-3">

        <div className="flex text-yellow-500">
          {[1,2,3,4,5].map((star) => (
            <FaStar
              key={star}
              className={
                star <= Math.round(product.rating)
                  ? ""
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <span className="font-semibold">
          {product.rating.toFixed(1)}
        </span>

        <span className="text-gray-500">
          ({product.numReviews} Reviews)
        </span>

      </div>
{canReview ? (
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block font-semibold">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="rounded-lg border p-3"
          >
            <option value={5}>5 ⭐</option>
            <option value={4}>4 ⭐</option>
            <option value={3}>3 ⭐</option>
            <option value={2}>2 ⭐</option>
            <option value={1}>1 ⭐</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Comment
          </label>

          <textarea
            rows={4}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={reviewMutation.isPending}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          {reviewMutation.isPending
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </form>
) : (
  <div className="mb-8 rounded-lg bg-gray-100 p-4 text-gray-600">
    You can review this product only after it has been delivered, and only once.
  </div>
)}
      <hr className="my-8" />

            {isPending ? (
        <p className="text-gray-500">
          Loading reviews...
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {review.customer?.name || "Anonymous"}
                </h3>

                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= review.rating
                          ? ""
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-gray-700">
                {review.comment || "No comment provided."}
              </p>

              <p className="mt-3 text-sm text-gray-400">
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}