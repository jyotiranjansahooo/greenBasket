"use client";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/cartService";

export default function useCart() {
  return useQuery({
    queryKey: ["cart"],

    queryFn: async () => {
      const data = await getCart();
      return data.cart;
    },
  });
}