"use client";

import Counter from "@/app/components/animation/Counter";

import { useQuery } from "@tanstack/react-query";

import { getHeroStats } from "@/services/publicService";

export default function HeroStats() {
  const { data, isPending } = useQuery({
    queryKey: ["hero-stats"],
    queryFn: getHeroStats,
  });

  if (isPending) {
    return null;
  }

  return (
    <div className="mt-12 grid grid-cols-3 gap-8">
      <div>
        <h2 className="text-4xl font-bold text-[#346739]">
<Counter
  key={data?.farmers}
  end={data?.farmers ?? 0}
  suffix="+"
/>        </h2>

        <p className="mt-2 text-gray-600">Farmers</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-[#346739]">
<Counter
  key={data?.orders}
  end={data?.orders ?? 0}
  suffix="+"
/>

    </h2>

        <p className="mt-2 text-gray-600">Orders</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-[#346739]">
<Counter
  key={data?.organicPercentage}
  end={
    data?.organicPercentage ?? 0
  }
  suffix="%"
/>            </h2>

        <p className="mt-2 text-gray-600">Organic</p>
      </div>
    </div>
  );
}
