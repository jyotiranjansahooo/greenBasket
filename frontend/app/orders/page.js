"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import PageTransition from "@/app/components/common/PageTransition";
import { getMyOrders, cancelOrder } from "@/services/orderService";

export default function OrdersPage() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelOrder,

    onSuccess: () => {
      toast.success("Order cancelled successfully.");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to cancel order."
      );
    },
  });

  const orders = data?.orders || [];

  const orderSteps = [
    "Pending",
    "Confirmed",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Packed":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5]">
        <h1 className="text-3xl font-bold text-[#346739]">
          Loading orders...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5]">
        <h1 className="text-3xl text-red-500">
          Failed to load orders
        </h1>
      </main>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#F7FAF5] p-6 text-gray-700 md:p-10">
        <div className="mx-auto max-w-6xl">

          <h1 className="heading-font mb-10 text-5xl text-[#346739]">
            My Orders 📦
          </h1>

          {orders.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 text-center shadow-lg">

              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-green-100 text-6xl">
                📦
              </div>

              <h2 className="mt-8 text-4xl font-bold text-[#346739]">
                No orders yet
              </h2>

              <p className="mt-4 text-lg text-gray-500">
                You haven&apos;t placed any orders yet.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-block rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white transition hover:bg-[#2c5c30]"
              >
                Start Shopping
              </Link>

            </div>
          ) : (
            <div className="space-y-8">

              {orders.map((order) => {
                const currentStep =
                  orderSteps.indexOf(order.status);

                return (
                  <div
                    key={order._id}
                    className="rounded-3xl bg-white p-8 shadow-lg"
                  >

                    {/* Header */}

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                      <div>
                        <h2 className="text-2xl font-bold text-[#346739]">
                          Farmer:{" "}
                          {order.farmer?.name ||
                            "Unknown Farmer"}
                        </h2>

                        <p className="mt-1 text-gray-500">
                          📍{" "}
                          {order.farmer?.farmLocation ||
                            "Location unavailable"}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          Order ID: {order._id}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                    </div>

                    {/* Timeline */}

                    {order.status !== "Cancelled" && (
                      <div className="mt-8">

                        <div className="flex flex-wrap items-center gap-3">

                          {orderSteps.map(
                            (step, index) => (
                              <div
                                key={step}
                                className="flex items-center gap-3"
                              >

                                <div
                                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                                    index <= currentStep
                                      ? "bg-green-600 text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                >
                                  {index + 1}
                                </div>

                                <span
                                  className={`text-sm font-medium ${
                                    index <= currentStep
                                      ? "text-green-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {step}
                                </span>

                                {index !==
                                  orderSteps.length - 1 && (
                                  <div className="h-1 w-8 rounded bg-gray-200" />
                                )}

                              </div>
                            )
                          )}

                        </div>

                      </div>
                    )}

                    {/* Products */}

                    <div className="mt-8 space-y-4">

                      {order.products.map(
                        (item, index) => (
                          <div
                            key={
                              item.product?._id ||
                              index
                            }
                            className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                          >

                            <div>
                              <p className="font-semibold">
                                {item.product?.name ||
                                  "Product unavailable"}
                              </p>

                              <p className="text-sm text-gray-500">
                                Quantity:{" "}
                                {item.quantity}
                              </p>
                            </div>

                            <span className="font-bold">
                              ₹
                              {item.price *
                                item.quantity}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                    {/* Payment */}

                    <div className="mt-8 grid gap-4 md:grid-cols-3">

                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="font-semibold">
                          Payment Method
                        </p>

                        <p className="mt-1 text-gray-600">
                          {order.paymentMethod ===
                          "ONLINE"
                            ? "Online Payment"
                            : "Cash on Delivery"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="font-semibold">
                          Payment Status
                        </p>

                        <p className="mt-1 text-gray-600">
                          {order.paymentStatus}
                        </p>
                      </div>
                      {order.transactionId && (
  <div className="rounded-2xl bg-gray-50 p-4">
    <p className="font-semibold">
      Transaction ID
    </p>

    <p className="mt-1 font-mono text-gray-600">
      {order.transactionId}
    </p>
  </div>
)}

                    </div>

                    {/* Footer */}

<div className="mt-8 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">

  <div className="text-2xl font-bold text-[#346739]">
    Total: ₹{order.totalAmount}
  </div>

  <div className="flex flex-wrap gap-3">

    <Link
      href={`/orders/${order._id}`}
      className="rounded-2xl bg-[#346739] px-6 py-3 font-semibold text-white transition hover:bg-[#2c5c30]"
    >
      View Details
    </Link>

    {["Pending", "Confirmed"].includes(
      order.status
    ) && (
      <button
        onClick={() =>
          cancelMutation.mutate(
            order._id
          )
        }
        disabled={
          cancelMutation.isPending
        }
        className="rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
      >
        Cancel Order
      </button>
    )}

  </div>

</div>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </main>
    </PageTransition>
  );
}