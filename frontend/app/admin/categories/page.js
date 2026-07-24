"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoryService";

import CategoryForm from "@/app/components/admin/CategoryForm";
import CategoryTable from "@/app/components/admin/CategoryTable";

export default function AdminCategoriesPage() {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: getCategories,
  });

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#8eb673]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#346739] border-r-[#346739]"></div>
          </div>

          <p className="text-lg font-semibold tracking-wide text-[#144a19]">
            Loading categories...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load categories
        </h1>
      </main>
    );
  }

  const categories = data?.categories || [];

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          Category Management
        </h1>

        <CategoryForm />

        <div className="mt-10">
          <CategoryTable
            categories={categories}
          />
        </div>

      </div>
    </main>
  );
}