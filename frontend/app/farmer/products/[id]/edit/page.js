"use client";

import { use } from "react";

import useProduct from "@/app/hooks/useProduct";
import ProductForm from "@/app/components/products/ProductForm";

export default function EditProductPage({ params }) {
  const { id } = use(params);

  const {
    data: product,
    isPending,
    error,
  } = useProduct(id);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load product
        </h1>
      </main>
    );
  }

  // Don't mount the form until the product exists.
  if (!product) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#4b7032] text-black py-10">
      <div className="mx-auto max-w-5xl px-6">
        <ProductForm
          key={product._id}
          product={product}
        />
      </div>
    </main>
  );
}