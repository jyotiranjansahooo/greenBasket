"use client";

import { useState } from "react";

import useMarketplaceProducts from "@/app/hooks/useMarketplaceProducts";
import useCategories from "@/app/hooks/useCategories";

import ProductCard from "@/app/components/products/ProductCard";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    farmingMethod: "",
    minPrice: "",
    maxPrice: "",
    sort: "latest",
  });

  const {
    data,
    isPending,
    error,
  } = useMarketplaceProducts(filters);



  const {
  data: categories = [],
  isPending: categoriesLoading,
} = useCategories();

  if (isPending || categoriesLoading) {
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
          Failed to load products
        </h1>
      </main>
    );
  }

  const products = data?.products || [];

  return (
    <main className="min-h-screen text-gray-800 bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="heading-font mb-8 text-5xl text-[#346739]">
          Fresh Products 🌱
        </h1>

        {/* Filters */}

        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">

          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="rounded-xl border p-3"
          />

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="rounded-xl border p-3"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={filters.farmingMethod}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                farmingMethod: e.target.value,
              }))
            }
            className="rounded-xl border p-3"
          >
            <option value="">
              All Methods
            </option>

            <option value="organic">
              Organic
            </option>

            <option value="conventional">
              Conventional
            </option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: e.target.value,
              }))
            }
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value,
              }))
            }
            className="rounded-xl border p-3"
          />

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value,
              }))
            }
            className="rounded-xl border p-3"
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="priceAsc">
              Price ↑
            </option>

            <option value="priceDesc">
              Price ↓
            </option>
          </select>

        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow">
            <h2 className="text-3xl font-bold">
              No Products Found
            </h2>

            <p className="mt-4 text-gray-500">
              Try changing your filters.
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