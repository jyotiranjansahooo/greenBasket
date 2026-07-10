"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getMyOrders,
  cancelOrder,
} from "@/services/orderService";

export default function OrdersPage() {
  const queryClient = useQueryClient();

const cancelMutation = useMutation({
  mutationFn: cancelOrder,

  onSuccess: () => {
    toast.success(
      "Order cancelled"
    );

    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  },

  onError: (error) => {
    toast.error(
      error.response?.data?.message ||
        "Failed to cancel order"
    );
  },
});
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
        <h1 className="text-3xl">
          Loading orders...
        </h1>
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

  const orderSteps = [
    "Pending",
    "Confirmed",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];

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
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

  <div>
    <h2 className="text-2xl font-bold">
      Farmer: {order.farmer?.name || "Unknown Farmer"}
    </h2>

    <p className="text-gray-500">
      {order.farmer?.farmLocation || "-"}
    </p>

    <div className="mt-4 space-y-2">

      <div>
        <span className="font-semibold">
          Payment Method:
        </span>{" "}
        {order.paymentMethod === "ONLINE"
          ? "Online Payment"
          : "Cash on Delivery"}
      </div>

      <div>
        <span className="font-semibold">
          Payment Status:
        </span>

        <span
          className={`ml-2 rounded-full px-3 py-1 text-sm ${
            order.paymentStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.paymentStatus}
        </span>
      </div>

    </div>
  </div>

  <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
    {order.status}
  </span>

</div>

                <div className="mt-6 space-y-2">

                  {order.products.map(
                    (item, index) => (
                      <div
                        key={
                          item.product?._id ||
                          index
                        }
                        className="flex justify-between"
                      >
                        <span>
                          {item.product?.name ||
                            "Product unavailable"}{" "}
                          × {item.quantity}
                        </span>

                        <span>
                          ₹
                          {item.price *
                            item.quantity}
                        </span>
                      </div>
                    )
                  )}

                </div>

                <hr className="my-6" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>
                    ₹{order.totalAmount}
                  </span>
                </div>
                {["Pending", "Confirmed"].includes(
  order.status
) && (
  <button
    onClick={() =>
      cancelMutation.mutate(
        order._id
      )
    }
    className="mt-6 rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
  >
    Cancel Order
  </button>
)}

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}