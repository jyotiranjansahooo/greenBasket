"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";

import { getWishlist } from "@/services/wishlistService";

export default function useWishlist() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,

    enabled: user?.role === "customer",
  });
}