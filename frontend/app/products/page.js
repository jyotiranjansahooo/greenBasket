"use client";

import useMarketplaceProducts from "@/app/hooks/useMarketplaceProducts";
import ProductCard from "@/app/components/products/ProductCard";

export default function ProductsPage() {
  const {
    data,
    isPending,
    error,
  } = useMarketplaceProducts();

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">Loading products...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load products
        </h1>
      </main>
    );
  }

  const products = data?.products || [];

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="heading-font mb-8 text-5xl text-[#346739]">
          Fresh Products 🌱
        </h1>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow">
            <h2 className="text-3xl font-bold">
              No Products Found
            </h2>

            <p className="mt-4 text-gray-500">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (
  <ProductCard
    key={product._id}
    product={product}
  />
))}

          </div>
        )}

      </div>
    </main>
  );
}