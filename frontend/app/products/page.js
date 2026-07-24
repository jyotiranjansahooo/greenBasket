"use client";

import { useState, useEffect } from "react";
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
  const [page, setPage] = useState(1);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);

      setFilters((prev) => ({
        ...prev,
        search: draftFilters.search,
      }));
    }, 800);

    return () => clearTimeout(timer);
  }, [draftFilters.search]);

  const { data, isPending, error, isFetching } = useMarketplaceProducts(
    filters,
    page,
  );
  const { data: categories = [], isPending: categoriesLoading } =
    useCategories();

  if (!data && (isPending || categoriesLoading)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#8eb673]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#346739] border-r-[#346739]"></div>
          </div>

          <p className="text-lg font-semibold tracking-wide text-[#144a19]">
            Loading products...
          </p>
        </div>
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
        <div className="mb-10 overflow-hidden rounded-3xl bg-linear-to-r from-[#346739] to-[#4f9657] p-8 text-white shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                🌱 Fresh from Local Farmers
              </span>

              <h1 className="mt-6 text-5xl font-bold">
                Discover Fresh & Organic Products
              </h1>

              <p className="mt-4 max-w-xl text-lg text-green-100">
                Browse fruits, vegetables, dairy products, and more directly
                from trusted local farmers.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const newFilters = {
                      ...draftFilters,
                      farmingMethod: "organic",
                    };

                    setDraftFilters(newFilters);
                    setPage(1);
                    setFilters(newFilters);
                  }}
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-[#346739] transition hover:scale-105"
                >
                  🌿 Organic
                </button>

                <button
                  onClick={() =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      sort: "popular",
                    }))
                  }
                  className="rounded-2xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-[#346739]"
                >
                  🔥 Popular
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-4xl font-bold">
                  {data?.totalProducts ?? 0}+
                </h3>

                <p className="mt-2 text-green-100">Products</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-4xl font-bold">{categories.length}+</h3>

                <p className="mt-2 text-green-100">Categories</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-4xl font-bold">🚚</h3>

                <p className="mt-2 text-green-100">Fast Delivery</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <h3 className="text-4xl font-bold">⭐</h3>

                <p className="mt-2 text-green-100">Top Quality</p>
              </div>
            </div>
          </div>
        </div>
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
              onClick={() => setShowFilters(!showFilters)}
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
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
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
                    <option value="">All Methods</option>

                    <option value="organic">Organic</option>

                    <option value="conventional">Conventional</option>
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
                    <option value="">All Ratings</option>

                    <option value="4">⭐ 4+</option>

                    <option value="3">⭐ 3+</option>

                    <option value="2">⭐ 2+</option>

                    <option value="1">⭐ 1+</option>
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
                    <option value="latest">Latest</option>

                    <option value="oldest">Oldest</option>

                    <option value="rating">⭐ Top Rated</option>

                    <option value="popular">🔥 Popular</option>

                    <option value="priceAsc">Price ↑</option>

                    <option value="priceDesc">Price ↓</option>
                  </select>

                  <button
                    onClick={() => {
                      setPage(1);
                      setFilters(draftFilters);
                    }}
                    className="filter-apply-btn"
                  >
                    Apply
                  </button>

                  <button
                    onClick={() => {
                      setDraftFilters(initialFilters);
                      setPage(1);
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
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {data?.totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-xl border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: data.totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`h-10 w-10 rounded-xl transition ${
                        data?.currentPage === pageNumber
                          ? "bg-[#346739] text-white"
                          : "border bg-white hover:bg-green-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={page === data.totalPages || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-xl border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
