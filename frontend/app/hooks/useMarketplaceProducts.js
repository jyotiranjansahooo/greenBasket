"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export default function useMarketplaceProducts(filters = {}) {
  return useQuery({
    queryKey: ["marketplace-products", filters],

    queryFn: async () => {
      return await getProducts(filters);
    },
  });
}