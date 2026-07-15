"use client";

import { useQuery } from "@tanstack/react-query";

import { getPlatformAnalytics } from "@/services/adminService";

export default function AdminDashboardPage() {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getPlatformAnalytics,
  });

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading analytics...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load analytics.
        </h1>
      </main>
    );
  }

  const analytics = data?.analytics;

  const cards = [
    {
      title: "Customers",
      value: analytics.totalCustomers,
    },

    {
      title: "Farmers",
      value: analytics.totalFarmers,
    },

    {
      title: "Verified Farmers",
      value: analytics.verifiedFarmers,
    },

    {
      title: "Products",
      value: analytics.totalProducts,
    },

    {
      title: "Categories",
      value: analytics.totalCategories,
    },

    {
      title: "Orders",
      value: analytics.totalOrders,
    },

    {
      title: "Revenue",
      value: `₹${analytics.totalRevenue}`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#d5d6bb] p-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <h2 className="text-lg text-gray-500">
                {card.title}
              </h2>

              <p className="mt-3 text-4xl font-bold text-[#346739]">
                {card.value}
              </p>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}