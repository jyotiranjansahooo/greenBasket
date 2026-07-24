"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export default function useMarketplaceProducts(
  filters = {},
  page = 1,
  limit = 16
) {
  return useQuery({
    queryKey: ["marketplace-products", filters, page, limit],

    queryFn: () =>
      getProducts({
        ...filters,
        page,
        limit,
      }),

    staleTime: 1000 * 60 * 5,

    placeholderData: (previousData) => previousData,
  });
}