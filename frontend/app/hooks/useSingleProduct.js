"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/productService";

export default function useSingleProduct(id) {
  return useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      const data = await getProduct(id);
      return data.product;
    },

    enabled: !!id,
  });
}