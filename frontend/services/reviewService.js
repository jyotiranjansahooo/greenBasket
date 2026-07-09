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
    `/reviews/${productId}`
  );

  return data;
}

// Update Review
export async function updateReview(
  id,
  reviewData
) {
  const { data } = await api.put(
    `/reviews/${id}`,
    reviewData
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