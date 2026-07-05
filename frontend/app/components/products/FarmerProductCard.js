"use client";

import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "@/lib/imageUrl";

export default function FarmerProductCard({ product }) {
 // const image = getImageUrl(product.images?.[0]);

const rawImage = product.images?.[0];
console.log("Product:", product);
console.log("Raw image:", rawImage);
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

const image = getImageUrl(rawImage);

console.log("Final image:", image);

console.log("Final image:", image);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl">

      <Image
  src={image}
  alt={product.name}
  width={400}
  height={250}
  loading="eager"
  className="h-52 w-full object-cover"
/>

      <div className="p-5">

        <h2 className="heading-font text-2xl text-[#346739]">
          {product.name}
        </h2>

        <p className="mt-2 text-gray-500">
          ₹ {product.price}/{product.unit}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {product.category.name}
        </p>

        <div className="mt-5 flex gap-3">

          <Link
            href={`/farmer/products/${product._id}/edit`}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            <FiEdit />
          </Link>

          <button
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            <FiTrash2 />
          </button>

        </div>

      </div>

    </div>
  );
}