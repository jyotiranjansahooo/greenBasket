"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
 

  return (
    <Link
      href={`/products?category=${category._id}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
  src={
    category.image
      ? `${process.env.NEXT_PUBLIC_API_URL}${category.image}`
      : "/placeholder.jpg"
  }
  alt={category.name}
  fill
  className="object-cover transition duration-500 group-hover:scale-110"
/>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#346739]">
          {category.name}
        </h3>

        <p className="mt-2 text-gray-600">
          Browse fresh {category.name.toLowerCase()} directly from local
          farmers.
        </p>

        <div className="mt-5 inline-flex items-center font-semibold text-green-600">
          Browse →
        </div>
      </div>
    </Link>
  );
}