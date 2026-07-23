"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/imageUrl";

export default function ProductGallery({ images = [] }) {
  const [selected, setSelected] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const gallery =
    images.length > 0 ? images : ["/images/product-placeholder.png"];

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-white shadow">
        {imageLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 animate-pulse">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#346739]" />
          </div>
        )}

        <Image
          src={getImageUrl(gallery[selected])}
          alt="Product"
          width={700}
          height={700}
          onLoad={() => setImageLoading(false)}
          className={`h-112.5 w-full object-cover transition-opacity duration-500 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setImageLoading(true);
                setSelected(index);
              }}
              className={`overflow-hidden rounded-xl border-2 ${
                selected === index ? "border-[#346739]" : "border-gray-200"
              }`}
            >
              <Image
                src={getImageUrl(image)}
                alt="Thumbnail"
                width={90}
                height={90}
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
