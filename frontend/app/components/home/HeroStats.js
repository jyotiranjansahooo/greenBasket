"use client";

import Counter from "@/app/components/animation/Counter";

export default function HeroStats() {
  return (
    <div className="mt-12 grid grid-cols-3 gap-8">

      <div>
        <h2 className="text-4xl font-bold text-[#346739]">
          <Counter end={500} suffix="+" />
        </h2>

        <p className="mt-2 text-gray-600">
          Farmers
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-[#346739]">
          <Counter end={10} suffix="K+" />
        </h2>

        <p className="mt-2 text-gray-600">
          Orders
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-[#346739]">
          <Counter end={100} suffix="%" />
        </h2>

        <p className="mt-2 text-gray-600">
          Organic
        </p>
      </div>

    </div>
  );
}