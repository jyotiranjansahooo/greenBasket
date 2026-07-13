"use client";

import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

import useCanReview from "@/app/hooks/useCanReview";
import useReviews from "@/app/hooks/useReviews";

import {
  createReview,
  updateReview,
  deleteReview,
} from "@/services/reviewService";

export default function ProductReviews({ product }) {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const {
    data: reviews = [],
    isPending,
  } = useReviews(product._id);

  const {
    data: canReview = false,
  } = useCanReview(product._id);

  // Create review
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Edit review
  const [editingReview, setEditingReview] =
    useState(null);

  const [editRating, setEditRating] =
    useState(5);

  const [editComment, setEditComment] =
    useState("");

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

  const updateMutation = useMutation({
    mutationFn: updateReview,

    onSuccess: () => {
      toast.success("Review updated");

      setEditingReview(null);

      queryClient.invalidateQueries({
        queryKey: ["reviews", product._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", product._id],
      });
    },

    onError: () => {
      toast.error(
        "Failed to update review"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,

    onSuccess: () => {
      toast.success("Review deleted");

      queryClient.invalidateQueries({
        queryKey: ["reviews", product._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", product._id],
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete review"
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
    <section className="mt-16 rounded-2xl text-gray-800 bg-white p-8 shadow">
      <h2 className="mb-6 text-3xl font-bold">
        Reviews
      </h2>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex text-yellow-500">
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <FaStar
                key={star}
                className={
                  star <=
                  Math.round(
                    product.rating
                  )
                    ? ""
                    : "text-gray-300"
                }
              />
            )
          )}
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
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
              className="rounded-lg border p-3"
            >
              <option value={5}>
                5 ⭐
              </option>
              <option value={4}>
                4 ⭐
              </option>
              <option value={3}>
                3 ⭐
              </option>
              <option value={2}>
                2 ⭐
              </option>
              <option value={1}>
                1 ⭐
              </option>
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
                setComment(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={
              reviewMutation.isPending
            }
            className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            {reviewMutation.isPending
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="mb-8 rounded-lg bg-gray-100 p-4 text-gray-600">
          You can review this
          product only after it
          has been delivered,
          and only once.
        </div>
      )}

      <hr className="my-8" />

      {isPending ? (
        <p className="text-gray-500">
          Loading reviews...
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet. Be the
          first to review this
          product!
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map(
            (review) => (
              <div
                key={review._id}
                className="rounded-xl border p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {review
                      .customer
                      ?.name ||
                      "Anonymous"}
                  </h3>

                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map(
                      (
                        star
                      ) => (
                        <FaStar
                          key={
                            star
                          }
                          className={
                            star <=
                            review.rating
                              ? ""
                              : "text-gray-300"
                          }
                        />
                      )
                    )}
                  </div>
                </div>

                <p className="mt-3 text-gray-700">
                  {review.comment ||
                    "No comment provided."}
                </p>

                {editingReview ===
                  review._id && (
                  <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4">
                    <select
                      value={
                        editRating
                      }
                      onChange={(
                        e
                      ) =>
                        setEditRating(
                          Number(
                            e
                              .target
                              .value
                          )
                        )
                      }
                      className="rounded-lg border p-2"
                    >
                      <option value={5}>
                        5 ⭐
                      </option>
                      <option value={4}>
                        4 ⭐
                      </option>
                      <option value={3}>
                        3 ⭐
                      </option>
                      <option value={2}>
                        2 ⭐
                      </option>
                      <option value={1}>
                        1 ⭐
                      </option>
                    </select>

                    <textarea
                      rows={3}
                      value={
                        editComment
                      }
                      onChange={(
                        e
                      ) =>
                        setEditComment(
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full rounded-lg border p-3"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          updateMutation.mutate(
                            {
                              id: review._id,
                              rating:
                                editRating,
                              comment:
                                editComment,
                            }
                          )
                        }
                        className="rounded-lg bg-green-600 px-4 py-2 text-white"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditingReview(
                            null
                          )
                        }
                        className="rounded-lg bg-gray-400 px-4 py-2 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {user?._id ===
                  review.customer
                    ?._id && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingReview(
                          review._id
                        );

                        setEditRating(
                          review.rating
                        );

                        setEditComment(
                          review.comment ||
                            ""
                        );
                      }}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteMutation.mutate(
                          review._id
                        )
                      }
                      className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <p className="mt-3 text-sm text-gray-400">
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}