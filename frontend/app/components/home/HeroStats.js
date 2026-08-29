"use client";

import Counter from "@/app/components/animation/Counter";
import { useQuery } from "@tanstack/react-query";
import { getHeroStats } from "@/services/publicService";

export default function HeroStats() {
  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["hero-stats"],
    queryFn: getHeroStats,

    // Hero statistics don't need to be
    // requested frequently.
    staleTime: 5 * 60 * 1000,

    // Keep the result cached for 30 minutes.
    gcTime: 30 * 60 * 1000,

    // Don't request it again just because
    // HeroStats mounts again.
    refetchOnMount: false,

    // Already disabled globally, but explicit here.
    refetchOnWindowFocus: false,

    // Don't repeatedly retry this public statistic.
    retry: 1,
  });

  // Don't block the Hero while statistics load.
  if (isPending) {
    return (
      <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <div className="h-10 w-16 animate-pulse rounded-lg bg-[#9FCB98]/40 sm:h-12 sm:w-20" />

            <div className="mt-3 h-4 w-16 animate-pulse rounded bg-gray-200 sm:w-20" />
          </div>
        ))}
      </div>
    );
  }

  // If the stats request fails, don't break
  // the entire Hero section.
  if (isError) {
    return null;
  }

  const farmers = data?.farmers ?? 0;
  const orders = data?.orders ?? 0;
  const organicPercentage =
    data?.organicPercentage ?? 0;

  return (
    <div className="mt-10 grid grid-cols-3 gap-4 sm:mt-12 sm:gap-8">
      {/* Farmers */}

      <div>
        <h2 className="text-2xl font-bold text-[#346739] sm:text-4xl">
          <Counter
            key={farmers}
            end={farmers}
            suffix="+"
          />
        </h2>

        <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
          Farmers
        </p>
      </div>

      {/* Orders */}

      <div>
        <h2 className="text-2xl font-bold text-[#346739] sm:text-4xl">
          <Counter
            key={orders}
            end={orders}
            suffix="+"
          />
        </h2>

        <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
          Orders
        </p>
      </div>

      {/* Organic */}

      <div>
        <h2 className="text-2xl font-bold text-[#346739] sm:text-4xl">
          <Counter
            key={organicPercentage}
            end={organicPercentage}
            suffix="%"
          />
        </h2>

        <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
          Organic
        </p>
      </div>
    </div>
  );
}
