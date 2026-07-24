"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllOrders } from "@/services/adminService";

export default function AdminOrdersPage() {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

   if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#8eb673]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#346739] border-r-[#346739]"></div>
          </div>

          <p className="text-lg font-semibold tracking-wide text-[#144a19]">
            Loading orders...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load orders.
        </h1>
      </main>
    );
  }

  const orders = data?.orders || [];

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10 text-black">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          All Orders
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            No orders found.
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Customer: {order.customer?.name}
                    </h2>

                    <p className="text-gray-600">
                      {order.customer?.email}
                    </p>

                    <p className="mt-2">
                      Farmer:{" "}
                      {order.farmer?.name || "Unknown Farmer"}
                    </p>
                  </div>

                  <div className="md:text-right">

                    <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                      {order.status}
                    </span>

                    <p className="mt-4 text-2xl font-bold">
                      ₹{order.totalAmount}
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-2"
                    >
                      <span>
                        {item.product?.name ||
                          "Deleted Product"}
                      </span>

                      <span>
                        {item.quantity} × ₹{item.price}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}