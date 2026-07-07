"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { getImageUrl } from "@/lib/imageUrl";

export default function ProductCard({ product }) {
  const image = getImageUrl(product.images?.[0]);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Image
        src={image}
        alt={product.name}
        width={400}
        height={250}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-3 p-5">

        <div className="flex items-center justify-between">

          <h2 className="heading-font text-2xl text-[#346739]">
            {product.name}
          </h2>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                product.farmingMethod === "organic"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {product.farmingMethod}
          </span>

        </div>

        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between">

          <span className="text-2xl font-bold text-[#346739]">
            ₹{product.price}
          </span>

          <span className="text-gray-500">
            / {product.unit}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <FiMapPin />

          <span>
            {product.origin ||
              product.farmer?.farmLocation ||
              "Unknown"}
          </span>

        </div>

        <Link
          href={`/products/${product._id}`}
          className="
            block
            rounded-xl
            bg-[#346739]
            py-3
            text-center
            font-semibold
            text-white
            transition
            hover:bg-[#2c5c30]
          "
        >
          View Details
        </Link>

      </div>

    </div>
  );
}