"use client";

export default function CategoryCard({ category }) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="text-center text-6xl">🌱</div>

      <h3 className="mt-4 text-center text-2xl font-bold">
        {category.name}
      </h3>

      <p className="mt-2 text-center text-gray-500">
        {category.description}
      </p>
    </div>
  );
}