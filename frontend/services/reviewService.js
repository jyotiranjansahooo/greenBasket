import api from "@/lib/axios";

// Add Review
export async function createReview(reviewData) {
  const { data } = await api.post(
    "/reviews",
    reviewData
  );

  return data;
}

// Get Product Reviews
export async function getProductReviews(productId) {
  const { data } = await api.get(
    `/reviews/product/${productId}`
  );

  return data;
}

// Update Review
export async function updateReview({
  id,
  rating,
  comment,
}) {
  const { data } = await api.put(
    `/reviews/${id}`,
    {
      rating,
      comment,
    }
  );

  return data;
}

// Delete Review
export async function deleteReview(id) {
  const { data } = await api.delete(
    `/reviews/${id}`
  );

  return data;
}