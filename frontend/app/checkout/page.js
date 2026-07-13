"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { placeOrder } from "@/services/orderService";import useCart from "@/app/hooks/useCart";


export default function CheckoutPage() {
  const { data: cart } = useCart();
  const router = useRouter();
const queryClient = useQueryClient();

const [deliveryAddress, setDeliveryAddress] = useState("");
const [deliverySlot, setDeliverySlot] = useState("Morning (8AM - 12PM)");
const [paymentMethod, setPaymentMethod] = useState("COD");

const orderMutation = useMutation({
  mutationFn: placeOrder,

  onSuccess: () => {
    toast.success("Order placed successfully!");

    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });

    router.push("/orders");
  },

  onError: (error) => {
    toast.error(
      error.response?.data?.message ||
      "Failed to place order."
    );
  },
});

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen text-gray-700 bg-[#F7FAF5] p-10">

      <div className="mx-auto max-w-5xl">

        <h1 className="heading-font mb-8 text-5xl text-[#346739]">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Delivery Details
            </h2>

            <input
  value={deliveryAddress}
  onChange={(e) =>
    setDeliveryAddress(e.target.value)
  }
  placeholder="Delivery Address"
  className="mb-4 w-full rounded-lg border p-3"
/>

            <select
  value={deliverySlot}
  onChange={(e) =>
    setDeliverySlot(e.target.value)
  }
  className="w-full rounded-lg border p-3"
>
  <option>Morning (8AM - 12PM)</option>
  <option>Afternoon (12PM - 4PM)</option>
  <option>Evening (4PM - 8PM)</option>
</select>
<div className="mt-4">
  <label className="mb-2 block font-medium">
    Payment Method
  </label>

  <select
    value={paymentMethod}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
    className="w-full rounded-lg border p-3"
  >
    <option value="COD">
      Cash on Delivery
    </option>

    <option value="ONLINE">
      Online Payment (Demo)
    </option>
  </select>
</div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            {items.map((item) => (
              <div
                key={item.product._id}
                className="mb-4 flex justify-between"
              >
                <span>
                  {item.product.name}
                  {" "}
                  ×
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {item.product.price *
                    item.quantity}
                </span>
              </div>
            ))}

            <hr className="my-6" />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>
                ₹{subtotal}
              </span>
              <button
  onClick={() => {
    if (!deliveryAddress.trim()) {
      return toast.error(
        "Please enter a delivery address."
      );
    }

    orderMutation.mutate({
  products: items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
  })),
  deliveryAddress,
  deliverySlot,
  paymentMethod,
});
  }}
  disabled={orderMutation.isPending}
  className="mt-8 w-full rounded-xl bg-[#346739] py-4 text-lg font-semibold text-white transition hover:bg-[#2c5c30] disabled:opacity-60"
>
  {orderMutation.isPending
    ? "Placing Order..."
    : "Place Order"}
</button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}