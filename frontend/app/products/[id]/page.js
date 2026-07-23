"use client";

import { use } from "react";
import ProductReviews from "@/app/components/products/ProductReviews";
import useSingleProduct from "@/app/hooks/useSingleProduct";
import ProductGallery from "@/app/components/products/ProductGallery";
import ProductInfo from "@/app/components/products/ProductInfo";
import ProductCardSkeleton from "@/app/components/products/ProductCardSkeleton";
import PageTransition from "@/app/components/common/PageTransition";

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);

  const { data: product, isPending, error } = useSingleProduct(id);

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F7FAF5] p-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-12 w-64 animate-pulse rounded-xl bg-green-100" />

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="h-125 animate-pulse rounded-3xl bg-gray-200" />

            <div className="space-y-6">
              <div className="h-12 w-2/3 animate-pulse rounded-xl bg-gray-200" />

              <div className="h-8 w-40 animate-pulse rounded-xl bg-gray-200" />

              <div className="space-y-3">
                <div className="h-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-14 w-48 animate-pulse rounded-2xl bg-green-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">Product not found</h1>
      </main>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#c0daae] p-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <ProductGallery images={product.images} />

            <ProductInfo product={product} />
          </div>

          <ProductReviews product={product} />
        </div>
      </main>
    </PageTransition>
  );
}
