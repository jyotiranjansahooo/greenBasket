"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FiUsers,
  FiUserCheck,
  FiPackage,
  FiGrid,
  FiShoppingCart,
  FiTruck,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";
import { CloudIcon, TruckIcon } from "@heroicons/react/24/solid";
import { FaTractor } from "react-icons/fa6";
import { IoCloud } from "react-icons/io5";

import { MdOutlineAgriculture } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { getPlatformAnalytics } from "@/services/adminService";

export default function AdminDashboardPage() {
  const { data, isPending, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getPlatformAnalytics,
  });

  if (isPending) {
    return (
      <main className="flex bg-[#71AC7D] min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Loading analytics...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen bg-[#71AC7D] items-center justify-center">
        <h1 className="text-6xl text-red-500">Failed to load analytics.</h1>
      </main>
    );
  }

  const analytics = data?.analytics;

  const cards = [
    {
      icon: FiUsers,
      title: "Customers",
      value: analytics.totalCustomers,
    },

    {
      icon: MdOutlineAgriculture,
      title: "Farmers",
      value: analytics.totalFarmers,
    },

    {
      icon: FiUserCheck,
      title: "Verified Farmers",
      value: analytics.verifiedFarmers,
    },

    {
      icon: FiPackage,
      title: "Products",
      value: analytics.totalProducts,
    },

    {
      icon: FiGrid,
      title: "Categories",
      value: analytics.totalCategories,
    },

    {
      icon: FiShoppingCart,
      title: "Orders",
      value: analytics.totalOrders,
    },

    {
      icon: FiTruck,
      title: "Delivered Orders",
      value: analytics.deliveredOrders,
    },

    {
      icon: FiTrendingUp,
      title: "Fulfilment Rate",
      value: `${analytics.fulfilmentRate}%`,
    },

    {
      icon: FiRefreshCw,
      title: "Repeat Customers",
      value: `${analytics.repeatCustomerRate}%`,
    },

    {
      icon: RiMoneyDollarCircleLine,
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
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
        rounded-3xl
        border
        border-[#c8d6bf]
        bg-[#f5f7ef]
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-500">
                    {card.title}
                  </h2>

                  <Icon className="text-2xl text-[#346739]" />
                </div>

                <p className="mt-5 text-4xl font-bold text-[#346739]">
                  {card.value}
                </p>
              </div>
            );
          })}
          <div
            className="
    col-span-2
    relative
    h-[180px]
    overflow-hidden
    rounded-3xl
    bg-gradient-to-b
    from-[#d8edd0]
    to-[#edf7e5]
    shadow-sm
  "
          >
            {/* clouds */}

            <IoCloud
              className="
    cloud-1
    absolute
    left-10
    top-6
    text-6xl
    text-white/80
  "
            />

            <IoCloud
              className="
    cloud-2
    absolute
    right-20
    top-10
    text-5xl
    text-white/70
  "
            />

            {/* hills */}

            <div className="absolute bottom-0 left-[-10%] h-24 w-[60%] rounded-t-full bg-[#7ca36d]" />

            <div className="absolute bottom-0 right-[-5%] h-28 w-[65%] rounded-t-full bg-[#5e874f]" />

            {/* road */}

            <div className="absolute bottom-0 h-10 w-full bg-[#3f5d34]" />

            <FaTractor
  className="
    tractor-1
    absolute
    bottom-5
    left-[-80px]
    text-[42px]
    text-[#f4b942]
  "
/>

            <FaTractor
  className="
    tractor-2
    absolute
    bottom-5
    left-[-80px]
    text-[42px]
    text-[#0e5407]
  "
/>
<FaTractor
  className="
    tractor-3
    absolute
    bottom-5
    left-[-80px]
    text-[42px]
    text-[#7e0404]
  "
/>

          </div>
        </div>
      </div>
    </main>
  );
}
