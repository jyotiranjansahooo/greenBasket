"use client";

import FadeUp from "@/components/animations/FadeUp";

export default function CategorySectionTitle() {
  return (
    <FadeUp>
      <div className="mx-auto max-w-2xl text-center">

        <span className="rounded-full bg-[#9FCB98]/30 px-5 py-2 text-sm font-semibold text-[#346739]">
          Browse Products
        </span>

        <h2 className="heading-font mt-6 text-5xl text-[#346739]">
          Shop By Category
        </h2>

        <p className="body-font mt-5 text-lg text-gray-600">
          Explore fresh produce directly from local farmers across different categories.
        </p>

      </div>
    </FadeUp>
  );
}