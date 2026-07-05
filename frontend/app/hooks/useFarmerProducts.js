"use client";

import { useQuery } from "@tanstack/react-query";
import { getFarmerProducts } from "@/services/productService";

export default function useFarmerProducts() {
  return useQuery({
    queryKey: ["farmer-products"],
    queryFn: () =>
      getFarmerProducts().then((data) => data.products || []),
  });
}