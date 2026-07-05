"use client";

import ProductForm from "@/app/components/products/ProductForm";

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-[#F7FAF5] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <ProductForm />
      </div>
    </main>
  );
}