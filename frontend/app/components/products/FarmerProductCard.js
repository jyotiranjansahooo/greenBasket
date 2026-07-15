"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiEdit,
  FiTrash2,
  FiPackage,
  FiAlertCircle,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getImageUrl } from "@/lib/imageUrl";
import { updateProductStock } from "@/services/productService";

export default function FarmerProductCard({
  product,
  onDelete,
}) {
  const image = getImageUrl(
    product.images?.[0]
  );

  const queryClient =
    useQueryClient();

  const stockMutation =
    useMutation({
      mutationFn: ({
        id,
        amount,
      }) =>
        updateProductStock(
          id,
          amount
        ),

      onSuccess: () => {
        toast.success(
          "Stock updated"
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "farmer-products",
            ],
          }
        );
      },

      onError: () => {
        toast.error(
          "Failed to update stock"
        );
      },
    });

  const isLowStock =
    product.quantity <= 5;

  const isOutOfStock =
    product.quantity <= 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#B8C8A8] bg-[#D7E4C0] shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Image
        src={image}
        alt={product.name}
        width={400}
        height={250}
        loading="eager"
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="heading-font text-2xl text-[#29542A]">
          {product.name}
        </h2>

        <p className="mt-2 text-lg font-medium text-[#3F4A3C]">
          ₹{product.price}/
          {product.unit}
        </p>

        <p className="mt-1 text-sm text-[#65715D]">
          {product.category
            ?.name ||
            "No category"}
        </p>

        {/* Stock Card */}

        <div className="mt-5 rounded-2xl border border-[#C4D0B8] bg-[#EEF5E5] p-4">

          <div className="flex items-center gap-2">

            <FiPackage className="text-[#346739]" />

            <span className="font-medium text-[#3F4A3C]">
              Available Stock
            </span>

          </div>

          <p className="mt-3 text-3xl font-bold text-[#29542A]">
            {product.quantity}{" "}
            {product.unit}
          </p>

          {isOutOfStock && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-sm font-medium text-red-700">

              <FiAlertCircle />

              Out of stock

            </div>
          )}

          {!isOutOfStock &&
            isLowStock && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700">

                <FiAlertCircle />

                Low stock

              </div>
            )}

        </div>

        {/* Bottom Actions */}

        <div className="mt-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                stockMutation.mutate(
                  {
                    id: product._id,
                    amount: -1,
                  }
                )
              }
              className="rounded-xl bg-[#e31717] p-2.5 text-white transition hover:scale-105 hover:bg-[#C54A4A]"
            >
              <FiMinus />
            </button>

            <button
              onClick={() =>
                stockMutation.mutate(
                  {
                    id: product._id,
                    amount: 1,
                  }
                )
              }
              className="rounded-xl bg-[#35b531] p-2.5 text-white transition hover:scale-105 hover:bg-[#3F7A3D]"
            >
              <FiPlus />
            </button>

          </div>

          <div className="flex gap-2">

            <Link
              href={`/farmer/products/${product._id}/edit`}
              className="rounded-xl bg-[#3270da] p-2.5 text-white transition hover:scale-105 hover:bg-[#4267A9]"
            >
              <FiEdit />
            </Link>

            <button
              onClick={() =>
                onDelete(
                  product._id
                )
              }
              className="rounded-xl bg-[#f41818] p-2.5 text-white transition hover:scale-105 hover:bg-[#C54A4A]"
            >
              <FiTrash2 />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}