"use client";

import { FiMapPin, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cartService";


export default function ProductInfo({ product }) {
 const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: () => addToCart(product._id),

  onSuccess: () => {
    toast.success("🛒 Added to cart!");

    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  },

  onError: (error) => {
    toast.error(
      error.response?.data?.message ||
      "Unable to add to cart."
    );
  },
});
  return (
    <div className="space-y-6">

      <div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            product.farmingMethod === "organic"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {product.farmingMethod}
        </span>

        <h1 className="mt-4 text-5xl font-bold text-[#346739]">
          {product.name}
        </h1>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>
      </div>

      <div className="text-4xl font-bold text-[#346739]">
        ₹{product.price}
        <span className="ml-2 text-xl text-gray-500">
          / {product.unit}
        </span>
      </div>

      <div className="space-y-3 text-gray-600">

        <div className="flex items-center gap-2">
          <FiMapPin />
          {product.origin || product.farmer?.farmLocation}
        </div>

        <div className="flex items-center gap-2">
  <FiCalendar />
  Harvest:{" "}
  {product.harvestDate?.slice(0, 10)}
</div>

      </div>

      <div className="rounded-2xl bg-white p-5 shadow">

        <h3 className="text-gray-700 font-semibold">
          Farmer Information
        </h3>

        <p className="mt-2 text-gray-700">
          👨‍🌾 {product.farmer?.name}
        </p>

        <p className="text-gray-700" >
          📞 {product.farmer?.phone}
        </p>

      </div>

      <button
  type="button"
  onClick={() => mutation.mutate()}
  disabled={mutation.isPending}
  className="
    w-full
    rounded-xl
    bg-[#346739]
    py-4
    text-lg
    font-semibold
    text-white
    transition
    hover:bg-[#2c5c30]
    disabled:opacity-50
  "
>
  {mutation.isPending
    ? "Adding..."
    : "Add to Cart"}
</button>

    </div>
  );
}