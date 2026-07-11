"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/services/reviewService";

export default function useReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId],

    queryFn: async () => {
      const data = await getProductReviews(productId);

      return data.reviews;
    },

    enabled: !!productId,
  });
}