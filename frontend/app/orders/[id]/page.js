"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import PageTransition from "@/app/components/common/PageTransition";
import { getOrderById } from "@/services/orderService";

export default function OrderDetailsPage({ params }) {
  const { id } = use(params);

  const { data, isPending, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
  });

  const order = data?.order;

  const orderSteps = [
    "Pending",
    "Confirmed",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = order
    ? orderSteps.indexOf(order.status)
    : -1;

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
          Loading order...
        </h1>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5]">
        <h1 className="text-3xl text-red-500">
          Order not found
        </h1>
      </main>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#F7FAF5] p-6 text-gray-700 md:p-10">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex items-center justify-between">
            <h1 className="heading-font text-5xl text-[#346739]">
              Order Details 📦
            </h1>

            <Link
              href="/orders"
              className="rounded-xl bg-white px-5 py-3 shadow"
            >
              ← Back
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-[#346739]">
                  Order #{order._id.slice(-6)}
                </h2>

                <p className="mt-2 text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-5 py-2 font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>

            </div>

            {/* Timeline */}

            {order.status !== "Cancelled" && (
              <div className="mt-10 flex flex-wrap gap-4">

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
                        className={
                          index <= currentStep
                            ? "font-semibold text-green-700"
                            : "text-gray-500"
                        }
                      >
                        {step}
                      </span>
                    </div>
                  )
                )}

              </div>
            )}

            {/* Address + Payment */}

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl bg-gray-50 p-5">
                <h3 className="mb-3 text-xl font-bold">
                  📍 Delivery Address
                </h3>

                <p>{order.deliveryAddress}</p>

                <p className="mt-3 text-gray-500">
                  Slot: {order.deliverySlot}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <h3 className="mb-3 text-xl font-bold">
                  💳 Payment
                </h3>

                <p>
                  Method:{" "}
                  {order.paymentMethod}
                </p>

                <p className="mt-2">
                  Status:{" "}
                  {order.paymentStatus}
                </p>
              </div>

            </div>

            {/* Products */}

            <div className="mt-10">

              <h3 className="mb-5 text-2xl font-bold">
                Products
              </h3>

              <div className="space-y-4">

                {order.products.map(
                  (item, index) => (
                    <div
                      key={
                        item.product?._id ||
                        index
                      }
                      className="flex items-center justify-between rounded-2xl bg-gray-50 p-5"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.product
                            ?.name ||
                            "Product unavailable"}
                        </p>

                        <p className="text-gray-500">
                          Quantity:{" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <span className="text-lg font-bold">
                        ₹
                        {item.price *
                          item.quantity}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="mt-8 border-t pt-6 text-right">
              <h3 className="text-3xl font-bold text-[#346739]">
                Total: ₹
                {order.totalAmount}
              </h3>
            </div>

          </div>

        </div>
      </main>
    </PageTransition>
  );
}