"use client";


import { use } from "react";
import ProductReviews from "@/app/components/products/ProductReviews";
import useSingleProduct from "@/app/hooks/useSingleProduct";
import ProductGallery from "@/app/components/products/ProductGallery";
import ProductInfo from "@/app/components/products/ProductInfo";


export default function ProductDetailsPage({
  params,
}) {
  const { id } = use(params);

  const {
    data: product,
    isPending,
    error,
  } = useSingleProduct(id);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">
          Loading...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Product not found
        </h1>
      </main>
    );
  }

 return (
  <main className="min-h-screen bg-[#F7FAF5] p-10">
    <div className="mx-auto max-w-7xl">

      <div className="grid gap-12 lg:grid-cols-2">

        <ProductGallery
          images={product.images}
        />

        <ProductInfo
          product={product}
        />

      </div>

      <ProductReviews product={product} />

    </div>
  </main>
);
}