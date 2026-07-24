"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPaymentOrder } from "@/services/paymentService";

import useCart from "@/app/hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import { placeOrder } from "@/services/orderService";

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { data: cart, isPending } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");

  const [deliverySlot, setDeliverySlot] = useState("Morning (8AM - 12PM)");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const deliveryFee = 50;

  const total = subtotal + deliveryFee;

  const orderMutation = useMutation({
    mutationFn: placeOrder,

    onSuccess: () => {
      toast.success("Order placed successfully!");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

router.push(
  paymentMethod === "ONLINE"
    ? "/payment/success"
    : "/orders"
);    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to place order.");
    },
  });

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      return toast.error("Please enter a delivery address.");
    }

    if (items.length === 0) {
      return toast.error("Your cart is empty.");
    }

    const orderData = {
      products: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      deliveryAddress,
      deliverySlot,
      paymentMethod,
    };

    // Demo online payment
    if (paymentMethod === "ONLINE") {
  try {
    const payment =
      await createPaymentOrder(
        total
      );

    const options = {
      key: process.env
        .NEXT_PUBLIC_RAZORPAY_KEY,

      amount:
        payment.order.amount,

      currency:
        payment.order.currency,

      name: "Green Basket",

      description:
        "Fresh Farm Products",

      order_id:
        payment.order.id,

      handler: function (
        response
      ) {
        orderMutation.mutate(
          orderData
        );
      },

      prefill: {
        name: user?.name,

        email: user?.email,

        contact:
          user?.phone,
      },

      theme: {
        color:
          "#346739",
      },
    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

    return;
  } catch (error) {
    toast.error(
      "Failed to open payment gateway."
    );

    return;
  }
}

    orderMutation.mutate(orderData);
  };

   if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#8eb673]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#346739] border-r-[#346739]"></div>
          </div>

          <p className="text-lg font-semibold tracking-wide text-[#144a19]">
            Loading checkout page...
          </p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5]">
        <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
          <div className="text-7xl">🛒</div>

          <h1 className="mt-6 text-4xl font-bold text-[#346739]">
            Your cart is empty
          </h1>

          <p className="mt-4 text-gray-500">
            Add some products before checking out.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-6 text-gray-700 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="heading-font mb-8 text-5xl text-[#346739]">
          Checkout 💳
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Side */}

          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-[#346739]">
                📍 Delivery Address
              </h2>

              <textarea
                rows={5}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full rounded-2xl border p-4 outline-none focus:border-green-500"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-[#346739]">
                🚚 Delivery Slot
              </h2>

              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full rounded-2xl border p-4 outline-none focus:border-green-500"
              >
                <option>Morning (8AM - 12PM)</option>

                <option>Afternoon (12PM - 4PM)</option>

                <option>Evening (4PM - 8PM)</option>
              </select>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-[#346739]">
                💳 Payment Method
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
  <button
    type="button"
    onClick={() =>
      setPaymentMethod("COD")
    }
    className={`rounded-2xl border p-5 text-left transition ${
      paymentMethod === "COD"
        ? "border-[#346739] bg-green-50"
        : "border-gray-200"
    }`}
  >
    <h3 className="font-bold">
      Cash on Delivery
    </h3>

    <p className="mt-1 text-sm text-gray-500">
      Pay when your order arrives.
    </p>
  </button>

  <button
    type="button"
    onClick={() =>
      setPaymentMethod("ONLINE")
    }
    className={`rounded-2xl border p-5 text-left transition ${
      paymentMethod === "ONLINE"
        ? "border-[#346739] bg-green-50"
        : "border-gray-200"
    }`}
  >
    <h3 className="font-bold">
      Online Payment
    </h3>

    <p className="mt-1 text-sm text-gray-500">
      Demo payment gateway.
    </p>
  </button>
</div>
            </div>
          </div>

          {/* Right Side */}

          <div className="h-fit rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-[#346739]">
              🛒 Order Summary
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-6" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>

                <span>₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-xl font-bold">
                <span>Total</span>

                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={orderMutation.isPending}
              className="mt-8 w-full rounded-2xl bg-[#346739] py-4 text-lg font-semibold text-white transition hover:bg-[#2c5c30] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {orderMutation.isPending ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
