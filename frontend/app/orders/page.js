"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "@/services/orderService";

export default function OrdersPage() {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">Loading orders...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load orders
        </h1>
      </main>
    );
  }

  const orders = data?.orders || [];

const broken = orders.filter(
  (order) =>
    !order.farmer ||
    order.products.some((p) => !p.product)
);

console.log("Broken orders:", broken);

if (broken.length > 0) {
  console.log(broken[0].products);
}
return (
    <main className="min-h-screen bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No orders yet
            </h2>

            <p className="mt-3 text-gray-500">
              Your orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Farmer: {order.farmer?.name || "Unknown Farmer"}
                    </h2>

                    <p className="text-gray-500">
                      {order.farmer?.farmLocation || "-"}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                    {order.status}
                  </span>

                </div>

                <div className="mt-6 space-y-2">

                  {order.products.map((item, index) => (
                    <div
                      key={item.product?._id || index}
                      className="flex justify-between"
                    >
                      <span>
                        {item.product?.name || "Product unavailable"} ×{" "}
                        {item.quantity}
                      </span>

                      <span>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}

                </div>

                <hr className="my-6" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}