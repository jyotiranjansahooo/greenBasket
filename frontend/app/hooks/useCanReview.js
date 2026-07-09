"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function useCanReview(productId) {
  return useQuery({
    queryKey: ["can-review", productId],

    queryFn: async () => {
      const { data } = await api.get(
        `/reviews/product/${productId}/can-review`
      );

      return data.canReview;
    },

    enabled: !!productId,
    retry: false,
  });
}