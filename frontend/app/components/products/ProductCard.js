"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart } from "@/services/cartService";
import { motion } from "framer-motion";
import { FiHeart, FiMapPin } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getImageUrl } from "@/lib/imageUrl";

import useWishlist from "@/app/hooks/useWishlist";
import { toggleWishlist } from "@/services/wishlistService";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ product }) {
  const [imageLoading, setImageLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const isCustomer = user?.role === "customer";
  const image = getImageUrl(product.images?.[0]);

  const queryClient = useQueryClient();

  const { data } = useWishlist();

  const wishlist = isCustomer ? data?.wishlist?.products || [] : [];

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const mutation = useMutation({
    mutationFn: toggleWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });

      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      );
    },

    onError: () => {
      toast.error("Please log in as a customer");
    },
  });
const cartMutation = useMutation({
  mutationFn: () => addToCart(product._id, 1),

    onSuccess: () => {
      toast.success("🛒 Added to cart");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Unable to add to cart.");
    },
  });

  return (
    <motion.div
      onClick={() => router.push(`/products/${product._id}`)}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.35,
      }}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow"
    >
      <div className="relative">
        <div className="relative">
  <motion.div
    whileHover={{ scale: 1.08 }}
    className="relative h-56 overflow-hidden"
  >
    {imageLoading && (
      <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#346739]" />
      </div>
    )}

    <Image
      src={image}
      alt={product.name}
      width={400}
      height={250}
      onLoad={() => setImageLoading(false)}
      className={`h-56 w-full object-cover transition-opacity duration-500 ${
        imageLoading ? "opacity-0" : "opacity-100"
      }`}
    />
  </motion.div>

  {isCustomer && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        mutation.mutate(product._id);
      }}
      className="absolute right-3 top-3 rounded-full bg-white p-3 shadow"
    >
      {isWishlisted ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FiHeart className="text-gray-700" />
      )}
    </button>
  )}
</div>

        {isCustomer && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              mutation.mutate(product._id);
            }}
            className="absolute right-3 top-3 rounded-full bg-white p-3 shadow"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FiHeart className="text-gray-700" />
            )}
          </button>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="heading-font text-2xl text-[#346739]">
            {product.name}
          </h2>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                product.farmingMethod === "organic"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {product.farmingMethod}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#346739]">
            ₹{product.sellingOptions?.[0]?.price}
          </span>

          <span className="text-gray-500">
            / {product.sellingOptions?.[0]?.quantity}{" "}
            {product.sellingOptions?.[0]?.unit}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiMapPin />

          <span>
            {product.origin || product.farmer?.farmLocation || "Unknown"}
          </span>
        </div>

        <button
  onClick={(e) => {
    e.stopPropagation();
    cartMutation.mutate();
  }}
  disabled={cartMutation.isPending}
  className="
    w-full
    rounded-xl
    bg-[#346739]
    py-3
    text-center
    font-semibold
    text-white
    transition
    hover:bg-[#2c5c30]
    disabled:opacity-50
  "
>
  {cartMutation.isPending
    ? "Adding..."
    : "Add to Cart"}
</button>
      </div>
    </motion.div>
  );
}
