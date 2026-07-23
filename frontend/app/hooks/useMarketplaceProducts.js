"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export default function useMarketplaceProducts(filters = {}) {
  return useQuery({
    queryKey: ["marketplace-products", filters],

    queryFn: () => getProducts(filters),

    staleTime: 1000 * 60 * 5, // 5 minutes

    placeholderData: (previousData) => previousData,
  });
}