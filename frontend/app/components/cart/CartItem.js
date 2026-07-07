"use client";

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCartItem,
  removeFromCart,
} from "@/services/cartService";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/imageUrl";

export default function CartItem({ item }) {
 const queryClient = useQueryClient();

const updateMutation = useMutation({
  mutationFn: ({ quantity }) =>
    updateCartItem(item.product._id, quantity),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  },

  onError: () => {
    toast.error("Failed to update cart.");
  },
});

const removeMutation = useMutation({
  mutationFn: () => removeFromCart(item.product._id),

  onSuccess: () => {
    toast.success("Product removed.");

    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  },

  onError: () => {
    toast.error("Failed to remove product.");
  },
});
  const image = getImageUrl(item.product.images?.[0]);

  return (
    <div className="flex items-center gap-6 rounded-2xl bg-white p-5 shadow">

      <Image
        src={image}
        alt={item.product.name}
        width={120}
        height={120}
        className="h-28 w-28 rounded-xl object-cover"
      />

      <div className="flex-1">

        <h2 className="text-2xl text-gray-900 font-bold">
          {item.product.name}
        </h2>

        <p className="mt-2 text-gray-800">
          ₹{item.product.price}/{item.product.unit}
        </p>

        <div className="mt-4 flex items-center gap-3">

  <button
    onClick={() =>
      updateMutation.mutate({
        quantity: item.quantity - 1,
      })
    }
    disabled={item.quantity <= 1}
    className="text-black rounded-lg bg-gray-200 p-2 disabled:opacity-50"
  >
    <FiMinus />
  </button>

  <span className="text-black font-semibold">
    {item.quantity}
  </span>

  <button
    onClick={() =>
      updateMutation.mutate({
        quantity: item.quantity + 1,
      })
    }
    className="rounded-lg text-black bg-gray-200 p-2"
  >
    <FiPlus />
  </button>

</div>

      </div>

      <div className="space-y-4 text-right">

  <p className="text-2xl  font-bold text-[#346739]">
    ₹{item.product.price * item.quantity}
  </p>

  <button
    onClick={() => removeMutation.mutate()}
    className="rounded-lg bg-red-500 p-3 text-white transition hover:bg-red-600"
  >
    <FiTrash2 />
  </button>

</div>

    </div>
  );
}