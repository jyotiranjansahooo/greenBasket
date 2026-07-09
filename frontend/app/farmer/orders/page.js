"use client";

import useFarmerOrders from "@/app/hooks/useFarmerOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/services/orderService";
import toast from "react-hot-toast";


export default function FarmerOrdersPage() {
  const {
    data: orders = [],
    isPending,
    error,
  } = useFarmerOrders();

  const queryClient = useQueryClient();

const statusMutation = useMutation({
  mutationFn: ({ id, status }) =>
    updateOrderStatus(id, status),

  onSuccess: () => {
    toast.success("Order updated.");

    queryClient.invalidateQueries({
      queryKey: ["farmer-orders"],
    });

    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  },

  onError: (error) => {
    toast.error(
      error.response?.data?.message ||
      "Failed to update order."
    );
  },
});

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Failed to load orders.
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black bg-[#F7FAF5] p-10">
      <h1 className="mb-10 text-5xl font-bold text-[#346739]">
        Farmer Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {order.customer?.name || "Unknown Customer"}
                  </h2>

                  <p>
                    {order.customer?.phone || "-"}
                  </p>

                  <p>
                    {order.customer?.address || "-"}
                  </p>
                </div>

                <div>
                  <select
  value={order.status}
  onChange={(e) =>
    statusMutation.mutate({
      id: order._id,
      status: e.target.value,
    })
  }
  className="rounded-lg border border-gray-300 p-2"
>
  <option>Pending</option>
  <option>Accepted</option>
  <option>Packed</option>
  <option>Out for Delivery</option>
  <option>Delivered</option>
  <option>Cancelled</option>
</select>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {order.products
                  .filter((item) => item.product)
                  .map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between"
                    >
                      <span>
                        {item.product.name}
                      </span>

                      <span>
                        {item.quantity}
                      </span>
                    </div>
                  ))}

                {order.products.every((item) => !item.product) && (
                  <p className="text-sm text-red-500">
                    Product no longer exists.
                  </p>
                )}
              </div>

              <hr className="my-5" />

              <div className="flex justify-between font-bold">
                <span>Total</span>

                <span>
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}