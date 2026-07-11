"use client";

import Link from "next/link";
import Image from "next/image";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useWishlist from "@/app/hooks/useWishlist";
import { toggleWishlist } from "@/services/wishlistService";
import { getImageUrl } from "@/lib/imageUrl";

export default function WishlistPage() {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    error,
  } = useWishlist();

  const mutation = useMutation({
    mutationFn: toggleWishlist,

    onSuccess: () => {
      toast.success("Wishlist updated");

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: () => {
      toast.error("Failed to update wishlist");
    },
  });

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">
          Loading wishlist...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load wishlist
        </h1>
      </main>
    );
  }

  const products =
    data?.wishlist?.products || [];

  return (
    <main className="min-h-screen text-gray-700 bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          ❤️ My Wishlist
        </h1>

        {products.length === 0 ? (
  <div className="rounded-3xl bg-white p-16 text-center shadow">
    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-red-100 text-6xl">
      ❤️
    </div>

    <h2 className="mt-8 text-4xl font-bold text-[#346739]">
      Your wishlist is empty
    </h2>

    <p className="mt-4 text-lg text-gray-500">
      Save your favorite products and come back to them later.
    </p>

    <Link
      href="/products"
      className="mt-8 inline-block rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white transition hover:bg-[#2c5c30]"
    >
      Browse Products
    </Link>
  </div>
) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <Image
                  src={getImageUrl(
                    product.images?.[0]
                  )}
                  alt={product.name}
                  width={400}
                  height={250}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold text-[#346739]">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-xl font-bold">
                    ₹{product.price}
                  </p>

                  <div className="mt-6 flex gap-3">

                    <Link
                      href={`/products/${product._id}`}
                      className="flex-1 rounded-lg bg-green-600 py-3 text-center text-white"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        mutation.mutate(
                          product._id
                        )
                      }
                      className="rounded-lg bg-red-500 px-4 text-white"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}