"use client";

import Image from "next/image";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { getAllProducts,deleteProduct,  toggleFeaturedProduct, } from "@/services/adminService";

export default function AdminProductsPage() {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getAllProducts,
  });
const queryClient = useQueryClient();

const featureMutation = useMutation({
  mutationFn: toggleFeaturedProduct,

  onSuccess: () => {
    toast.success(
      "Featured status updated"
    );

    queryClient.invalidateQueries({
      queryKey: ["admin-products"],
    });
  },

  onError: () => {
    toast.error(
      "Failed to update product"
    );
  },
});
const deleteMutation = useMutation({
  mutationFn: deleteProduct,

  onSuccess: () => {
    toast.success(
      "Product deleted successfully"
    );

    queryClient.invalidateQueries({
      queryKey: ["admin-products"],
    });
  },

  onError: () => {
    toast.error(
      "Failed to delete product"
    );
  },
});
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">
          Loading products...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load products.
        </h1>
      </main>
    );
  }

  const products = data?.products || [];

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10 text-black">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          Products
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl bg-white p-5 shadow"
            >
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">

                <Image
                  src={`http://localhost:5000${product.images?.[0]}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                />

              </div>

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {product.category?.name}
              </p>

              <p className="mt-2">
                Farmer: {product.farmer?.name}
              </p>

              <p className="mt-2 font-bold text-green-700">
                ₹{product.price}
              </p>
              <div className="mt-5 flex gap-3">
<button
  onClick={() =>
    featureMutation.mutate(
      product._id
    )
  }
  className={`rounded-lg px-4 py-2 text-white ${
    product.isFeatured
      ? "bg-yellow-500"
      : "bg-blue-500"
  }`}
>
  {product.isFeatured
    ? "★ Featured"
    : "☆ Feature"}
</button>
  <button
    onClick={() => {
      const confirmed =
        window.confirm(
          `Delete "${product.name}"?`
        );

      if (confirmed) {
        deleteMutation.mutate(
          product._id
        );
      }
    }}
    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
  >
    Delete
  </button>

</div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}