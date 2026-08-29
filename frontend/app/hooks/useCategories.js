"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoryService";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const data = await getCategories();

      return data?.categories || [];
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
