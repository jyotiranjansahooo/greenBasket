"use client";

import useCategories from "@/app/hooks/useCategories";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "@/app/components/ui/skeliton/CategorySkeleton";

export default function Categories() {
  const { data: categories = [], isPending: loading, error } = useCategories();
  if (error) {
    return (
      <section className="py-24">
        <h2 className="text-center text-red-500">{error}</h2>
      </section>
    );
  }

  return (
    <section className="bg-[#eaf4e2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="heading-font text-center text-5xl text-[#346739]">
          Browse Categories
        </h2>

        <p className="body-font mt-5 text-center text-gray-500">
          Fresh products directly from local farmers.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
        </div>
      </div>
    </section>
  );
}
