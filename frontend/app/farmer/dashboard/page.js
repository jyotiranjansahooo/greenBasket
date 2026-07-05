"use client";

import Link from "next/link";

export default function FarmerDashboard() {
  return (
    <main className="min-h-screen bg-[#F7FAF5] p-8">

      <h1 className="heading-font text-4xl text-[#346739]">
        Farmer Dashboard 👨‍🌾
      </h1>

      <p className="body-font mt-2 text-gray-500">
        Manage your farm products.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Products</h2>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Orders</h2>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Revenue</h2>
          <p className="mt-3 text-4xl font-bold">₹0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Pending Orders</h2>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>

      </div>

      <div className="mt-10">

        <Link
          href="/farmer/products"
          className="rounded-xl bg-[#346739] px-6 py-3 text-white"
        >
          Manage Products
        </Link>

      </div>

    </main>
  );
}