"use client";

import Link from "next/link";
import useFarmerProducts from "@/app/hooks/useFarmerProducts";
import FarmerProductCard from "@/app/components/products/FarmerProductCard";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/productService";

export default function FarmerProductsPage() {
  const {
    data: products = [],
    isPending,
    error,
    refetch,
  } = useFarmerProducts();
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      toast.success("🌱 Product deleted successfully!");

      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete product.");
    }
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#68ad3a]">
        <div className="rounded-2xl bg-green-400 p-8 shadow-lg text-center">
          <h2 className="text-2xl  font-bold text-red-500">
            Failed to load products
          </h2>

          <p className="mt-3 text-gray-500">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#81A281] p-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="heading-font text-5xl text-[#09460f]">My Products</h1>

        <Link
          href="/farmer/products/add"
          className="rounded-xl bg-[#346739] px-6 py-3 text-white"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl bg-[#E3CBA4] p-16 text-center shadow">
          <h2 className="text-3xl font-bold">No Products Yet 🌱</h2>

          <p className="mt-4 text-gray-500">
            Add your first product to start selling.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <FarmerProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              
            />
          ))}
        </div>
      )}
    </main>
  );
}
