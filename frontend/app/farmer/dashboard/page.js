"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getFarmerAnalytics,
  getRecentOrders,
  updateOrderStatus,
} from "@/services/farmerService";

export default function FarmerDashboard() {
  const { data, isPending, error } = useQuery({
    queryKey: ["farmer-analytics"],
    queryFn: getFarmerAnalytics,
  });
   const {
    data: ordersData,
  } = useQuery({
    queryKey: ["farmer-recent-orders"],
    queryFn: getRecentOrders,
  });
  const queryClient = useQueryClient();

const statusMutation = useMutation({
  mutationFn: updateOrderStatus,

  onSuccess: () => {
    toast.success("Order status updated");

    queryClient.invalidateQueries({
      queryKey: ["farmer-recent-orders"],
    });

    queryClient.invalidateQueries({
      queryKey: ["farmer-analytics"],
    });
  },

  onError: () => {
    toast.error("Failed to update order status");
  },
});
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">Failed to load analytics</h1>
      </main>
    );
  }

  
  const analytics = data?.analytics;
  const recentOrders = ordersData?.orders || [];
  return (
    <main className="min-h-screen text-gray-700 bg-[#F7FAF5] p-8">
      <h1 className="heading-font text-4xl text-[#346739]">
        Farmer Dashboard 👨‍🌾
      </h1>

      <p className="body-font mt-2 text-gray-500">Manage your farm products.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-5">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Products</h2>
          <p className="mt-3 text-4xl font-bold">
            {analytics.totalProducts}
          </p>{" "}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Total Orders</h2>
          <p className="mt-3 text-4xl font-bold">
            {analytics.totalOrders}
          </p>{" "}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Revenue</h2>
          <p className="mt-3 text-4xl font-bold">₹{analytics.revenue}</p>{" "}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2>Pending Orders</h2>
          <p className="mt-3 text-4xl font-bold">
            {analytics.pendingOrders}
          </p>{" "}
        </div>
      <div className="rounded-3xl bg-white p-6 shadow">
        <h2>Delivered Orders</h2>

        <p className="mt-3 text-4xl font-bold">{analytics.deliveredOrders}</p>
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
<section className="mt-12">
  <h2 className="mb-6 text-3xl font-bold text-[#346739]">
    Recent Orders
  </h2>

  {recentOrders.length === 0 ? (
    <div className="rounded-3xl bg-white p-6 shadow">
      No recent orders.
    </div>
  ) : (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div
          key={order._id}
          className="rounded-3xl bg-white p-6 shadow"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-bold">
                {order.customer?.name}
              </h3>

              <div className="mt-2 text-gray-600">
                {order.products.map(
                  (item, index) => (
                    <p key={index}>
                      {item.product?.name} ×{" "}
                      {item.quantity}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">
                ₹{order.totalAmount}
              </p>

              <div className="mt-2">
  <select
    value={order.status}
    onChange={(e) =>
      statusMutation.mutate({
        id: order._id,
        status: e.target.value,
      })
    }
    className="rounded-lg border p-2"
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Packed">Packed</option>
    <option value="Out for Delivery">
      Out for Delivery
    </option>
    <option value="Delivered">
      Delivered
    </option>
    <option value="Cancelled">
      Cancelled
    </option>
  </select>
</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
    </main>
  );
}
