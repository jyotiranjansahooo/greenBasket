"use client";

import { use } from "react";

import useProduct from "@/app/hooks/useProduct";
import ProductForm from "@/app/components/products/ProductForm";

export default function EditProductPage({
  params,
}) {
  const { id } = use(params);

  const {
    data: product,
    isPending,
    error,
  } = useProduct(id);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EEF4E6]">
        <div className="rounded-3xl border border-[#D4DDCB] bg-[#F7FAF4] px-12 py-10 shadow-lg">
          <h1 className="text-3xl font-semibold text-[#2F5130]">
            Loading product...
          </h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EEF4E6]">
        <div className="rounded-3xl border border-red-200 bg-[#FFF5F5] px-12 py-10 shadow-lg">
          <h1 className="text-3xl font-semibold text-red-600">
            Failed to load product
          </h1>
        </div>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#55742b] py-12 text-[#2F3A2E]">

      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-8 rounded-3xl border border-[#D4DDCB] bg-[#a0bf82] p-8 shadow-md">

          <h1 className="heading-font text-5xl text-[#143915]">
            Edit Product
          </h1>

          <p className="mt-3 text-lg font-medium text-[#dfe6db]">
            Update your product information, inventory,
            images, and pricing.
          </p>

        </div>

        <div className="rounded-3xl border border-[#D4DDCB] bg-[#F7FAF4] p-8 shadow-md">

          <ProductForm
            key={product._id}
            product={product}
          />

        </div>

      </div>

    </main>
  );
}