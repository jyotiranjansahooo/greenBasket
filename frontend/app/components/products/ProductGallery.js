"use client";

import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/imageUrl";

export default function ProductGallery({ images = [] }) {
  const [selected, setSelected] = useState(0);

  const gallery =
    images.length > 0
      ? images
      : ["/images/product-placeholder.png"];

  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-white shadow">
        <Image
          src={getImageUrl(gallery[selected])}
          alt="Product"
          width={700}
          height={700}
          className="h-[450px] w-full object-cover"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              className={`overflow-hidden rounded-xl border-2 ${
                selected === index
                  ? "border-[#346739]"
                  : "border-gray-200"
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