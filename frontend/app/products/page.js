"use client";

import { global } from "styled-jsx/css";
import { useState } from "react";
import useMarketplaceProducts from "@/app/hooks/useMarketplaceProducts";
import useCategories from "@/app/hooks/useCategories";
import { FiFilter } from "react-icons/fi";
import ProductCard from "@/app/components/products/ProductCard";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const initialFilters = {
    search: "",
    category: "",
    farmingMethod: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sort: "latest",
  };

  const [filters, setFilters] = useState(initialFilters);

  const [draftFilters, setDraftFilters] = useState(initialFilters);

  const { data, isPending, error } = useMarketplaceProducts(filters);

  const { data: categories = [], isPending: categoriesLoading } =
    useCategories();

  if (isPending || categoriesLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">Loading products...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">Failed to load products</h1>
      </main>
    );
  }

  const products = data?.products || [];

  return (
    <main className="min-h-screen text-gray-800 bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-4">

  <div className="flex items-center gap-4">

    <input
      type="text"
      placeholder="🔍 Search fresh products..."
      value={draftFilters.search}
      onChange={(e) =>
        setDraftFilters((prev) => ({
          ...prev,
          search: e.target.value,
        }))
      }
      className="
        h-14
        flex-1
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        text-lg
        shadow
        outline-none
        focus:border-[#346739]
      "
    />

    <button
      onClick={() =>
        setShowFilters(!showFilters)
      }
      className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-[#346739]
        text-2xl
        text-white
        shadow
      "
    >
      <FiFilter />
    </button>

  </div>

<AnimatePresence>
  {showFilters && (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
      exit={{
        opacity: 0,
        height: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="overflow-hidden"
    >
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 shadow-lg">

        <select
          value={draftFilters.category}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
          className="filter-input w-52"
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
          value={draftFilters.farmingMethod}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              farmingMethod: e.target.value,
            }))
          }
          className="filter-input w-44"
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
          value={draftFilters.minPrice}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              minPrice: e.target.value,
            }))
          }
          className="filter-input w-36"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={draftFilters.maxPrice}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              maxPrice: e.target.value,
            }))
          }
          className="filter-input w-36"
        />

        <select
          value={draftFilters.rating}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              rating: e.target.value,
            }))
          }
          className="filter-input w-40"
        >
          <option value="">
            All Ratings
          </option>

          <option value="4">
            ⭐ 4+
          </option>

          <option value="3">
            ⭐ 3+
          </option>

          <option value="2">
            ⭐ 2+
          </option>

          <option value="1">
            ⭐ 1+
          </option>
        </select>

        <select
          value={draftFilters.sort}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              sort: e.target.value,
            }))
          }
          className="filter-input w-44"
        >
          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="rating">
            ⭐ Top Rated
          </option>

          <option value="popular">
            🔥 Popular
          </option>

          <option value="priceAsc">
            Price ↑
          </option>

          <option value="priceDesc">
            Price ↓
          </option>
        </select>

        <button
          onClick={() =>
            setFilters(draftFilters)
          }
          className="filter-apply-btn"
        >
          Apply
        </button>

        <button
          onClick={() => {
            setDraftFilters(initialFilters);
            setFilters(initialFilters);
          }}
          className="filter-clear-btn"
        >
          Clear
        </button>

      </div>
    </motion.div>
  )}
</AnimatePresence>

</div>

        {/* Filters */}
        

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-yellow-100 text-6xl">
              🔍
            </div>

            <h2 className="mt-8 text-4xl font-bold text-[#346739]">
              No Products Found
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Try changing your filters or search for something else.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
