"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getFarmerAnalytics,
  getRecentOrders,
  updateOrderStatus,
  getLowStockProducts,
} from "@/services/farmerService";

export default function FarmerDashboard() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["farmer-analytics"],
    queryFn: getFarmerAnalytics,
  });

  const { data: ordersData } = useQuery({
    queryKey: ["farmer-recent-orders"],
    queryFn: getRecentOrders,
  });

  const { data: stockData } = useQuery({
    queryKey: ["low-stock"],
    queryFn: getLowStockProducts,
  });

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

      queryClient.invalidateQueries({
        queryKey: ["low-stock"],
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

  const lowStockProducts = stockData?.products || [];

  return (
    <main className="min-h-screen bg-linear-to-br from-[#6D9773] via-[#8BA888] to-[#A4C3A2]  p-8 text-gray-700">
      <h1 className="heading-font text-4xl text-[#346739]">
        Farmer Dashboard 👨‍🌾
      </h1>

      <p className="body-font mt-2 text-gray-500">Manage your farm products.</p>

      {/* Main Cards */}

      <div className="mt-10 grid gap-6 md:grid-cols-5">
        <div className="rounded-3xl bg-[#ebe3d6] p-6 shadow text-2xl text-center font-bold">
          <h2>Total Products</h2>

          <p className="mt-3 text-3xl font-semibold">{analytics.totalProducts}</p>
        </div>

        <div className="rounded-3xl bg-[#ebe3d6] text-2xl text-center font-bold p-6 shadow">
          <h2>Total Orders</h2>

          <p className="mt-3 text-3xl font-semibold">{analytics.totalOrders}</p>
        </div>

        <div className="rounded-3xl bg-[#ebe3d6] p-6 text-2xl text-center font-bold shadow">
          <h2>Revenue</h2>

          <p className="mt-3 text-3xl font-semibold">₹{analytics.revenue}</p>
        </div>

        <div className="rounded-3xl bg-[#ebe3d6] text-2xl text-center font-bold p-6 shadow">
          <h2>Pending Orders</h2>

          <p className="mt-3 text-3xl font-semibold">{analytics.pendingOrders}</p>
        </div>

        <div className="rounded-3xl bg-[#ebe3d6] text-2xl text-center font-bold p-6 shadow">
          <h2>Delivered Orders</h2>

          <p className="mt-3 text-4xl font-semibold">{analytics.deliveredOrders}</p>
        </div>
      </div>

      {/* Business Analytics */}

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-[#ebe3d6] text-2xl text-center font-bold p-6 shadow">
          <h2>Revenue This Week</h2>

          <p className="mt-3 text-2xl font-semibold text-[#346739]">
            ₹{analytics.weeklyRevenue || 0}
          </p>
        </div>

        <div className="rounded-3xl bg-[#ebe3d6] text-2xl text-center font-bold p-6 shadow">
          <h2>Best Seller</h2>

          <p className="mt-3 text-xl font-semibold text-[#346739]">
            {analytics.bestSellingProduct || "No sales"}
          </p>
        </div>

        <div className="rounded-3xl bg-[#ebe3d6] text-2xl text-center font-bold p-6 shadow">
          <h2>Customers</h2>

          <p className="mt-3 text-2xl font-semibold text-[#346739]">
            {analytics.totalCustomers || 0}
          </p>
        </div>
      </div>

      {/* Inventory */}

      <div className="mt-10 rounded-3xl bg-[#ebe3d6] p-6 shadow">
        <h2 className="mb-5 text-2xl font-bold text-[#346739]">
          Inventory Alerts
        </h2>

        {lowStockProducts.length > 0 ? (
          lowStockProducts.map((product) => (
            <div
              key={product._id}
              className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4"
            >
              ⚠️ {product.name}
              {" — Only "}
              {product.quantity} {product.unit} left
            </div>
          ))
        ) : (
          <p className="text-gray-500">All products are in stock.</p>
        )}
      </div>

      {/* Actions */}

      <div className="mt-10">
        <Link
          href="/farmer/products"
          className="rounded-xl bg-[#346739] px-6 py-3 text-white"
        >
          Manage Products
        </Link>
      </div>

      {/* Recent Orders */}

      <section className="mt-12">
        <h2 className="mb-6 text-3xl font-bold text-[#346739]">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <div className="rounded-3xl bg-[#ebe3d6] p-6 shadow">
            No recent orders.
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order._id} className="rounded-3xl bg-[#ebe3d6] p-6 shadow">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h3 className="text-xl font-bold">
                      {order.customer?.name}
                    </h3>

                    <div className="mt-2 text-gray-600">
                      {order.products.map((item, index) => (
                        <p key={index}>
                          {item.product?.name} × {item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">₹{order.totalAmount}</p>

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

                        <option value="Delivered">Delivered</option>

                        <option value="Cancelled">Cancelled</option>
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
