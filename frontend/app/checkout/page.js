"use client";

import { useEffect, useState } from "react";
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

  const [deliveryAddress, setDeliveryAddress] = useState({
    houseNumber: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [deliverySlot, setDeliverySlot] = useState(
    "Morning (8AM - 12PM)",
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [isProcessingPayment, setIsProcessingPayment] =
    useState(false);

  const items = cart?.items || [];

  // =====================================================
  // Load saved user address
  // =====================================================

  useEffect(() => {
    if (!user?.address) return;

    setDeliveryAddress({
      houseNumber: user.address.houseNumber || "",
      street: user.address.street || user.address.area || "",
      landmark: user.address.landmark || "",
      city: user.address.city || "",
      state: user.address.state || "",
      pincode: user.address.pincode || "",
    });
  }, [user]);

  // =====================================================
  // Price calculation
  // =====================================================

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );

  const deliveryFee = 50;

  const total = subtotal + deliveryFee;

  // =====================================================
  // Order mutation
  // =====================================================

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
          : "/orders",
      );
    },

    onError: (error) => {
      console.error("ORDER ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to place order.",
      );

      setIsProcessingPayment(false);
    },
  });

  // =====================================================
  // Address change
  // =====================================================

  const handleAddressChange = (field, value) => {
    setDeliveryAddress((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // Address validation
  // =====================================================

  const validateAddress = () => {
    const requiredFields = [
      {
        key: "houseNumber",
        label: "House / Flat number",
      },
      {
        key: "street",
        label: "Street / Area",
      },
      {
        key: "landmark",
        label: "Landmark",
      },
      {
        key: "city",
        label: "City",
      },
      {
        key: "state",
        label: "State",
      },
      {
        key: "pincode",
        label: "Pincode",
      },
    ];

    for (const field of requiredFields) {
      if (!deliveryAddress[field.key].trim()) {
        toast.error(`${field.label} is required.`);
        return false;
      }
    }

    if (!/^\d{6}$/.test(deliveryAddress.pincode.trim())) {
      toast.error("Please enter a valid 6-digit pincode.");
      return false;
    }

    return true;
  };

  // =====================================================
  // Place order
  // =====================================================

  const handlePlaceOrder = async () => {
    if (
      orderMutation.isPending ||
      isProcessingPayment
    ) {
      return;
    }

    if (!validateAddress()) {
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderData = {
      products: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),

      deliveryAddress: {
        houseNumber:
          deliveryAddress.houseNumber.trim(),

        street:
          deliveryAddress.street.trim(),

        landmark:
          deliveryAddress.landmark.trim(),

        city:
          deliveryAddress.city.trim(),

        state:
          deliveryAddress.state.trim(),

        pincode:
          deliveryAddress.pincode.trim(),
      },

      deliverySlot,

      paymentMethod,
    };

    // ===================================================
    // Online Payment
    // ===================================================

    if (paymentMethod === "ONLINE") {
      try {
        setIsProcessingPayment(true);

        const payment =
          await createPaymentOrder(total);

        if (!payment?.order?.id) {
          throw new Error(
            "Invalid payment order response.",
          );
        }

        if (
          typeof window === "undefined" ||
          !window.Razorpay
        ) {
          throw new Error(
            "Razorpay SDK is not loaded.",
          );
        }

        const options = {
          key:
            process.env
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

          handler: function () {
            orderMutation.mutate(orderData);
          },

          modal: {
            ondismiss: function () {
              setIsProcessingPayment(false);

              toast.error(
                "Payment was cancelled.",
              );
            },
          },

          prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: user?.phone || "",
          },

          theme: {
            color: "#346739",
          },
        };

        const razorpay =
          new window.Razorpay(options);

        razorpay.on(
          "payment.failed",
          function () {
            setIsProcessingPayment(false);

            toast.error(
              "Payment failed. Please try again.",
            );
          },
        );

        razorpay.open();

        return;
      } catch (error) {
        console.error(
          "RAZORPAY ERROR:",
          error,
        );

        setIsProcessingPayment(false);

        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to open payment gateway.",
        );

        return;
      }
    }

    // ===================================================
    // Cash On Delivery
    // ===================================================

    orderMutation.mutate(orderData);
  };

  // =====================================================
  // Loading state
  // =====================================================

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#8eb673] px-4">
        <div className="flex flex-col items-center gap-5">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200" />

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-[#346739] border-t-[#346739]" />
          </div>

          <p className="text-center text-base font-semibold tracking-wide text-[#144a19] sm:text-lg">
            Loading checkout page...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // Empty cart
  // =====================================================

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#346739]">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 8h12l1 12H5L6 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#346739] sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 text-sm text-gray-500 sm:text-base">
            Add some products before checking out.
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // Checkout UI
  // =====================================================

  return (
    <main className="min-h-screen bg-[#F7FAF5] px-4 py-6 text-gray-700 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-7 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-[#346739] sm:h-12 sm:w-12">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="M3 10h18" />
                <path d="M7 15h4" />
              </svg>
            </div>

            <h1 className="heading-font text-4xl text-[#346739] sm:text-5xl">
              Checkout
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="space-y-6 lg:col-span-2 lg:space-y-8">
            {/* =================================================
                DELIVERY ADDRESS
            ================================================= */}

            <section className="rounded-3xl bg-white p-5 shadow-lg sm:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#346739]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#346739] sm:text-2xl">
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the complete address where your
                    order should be delivered.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* House Number */}

                <div>
                  <label
                    htmlFor="houseNumber"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    House / Flat Number
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="houseNumber"
                    type="text"
                    value={
                      deliveryAddress.houseNumber
                    }
                    onChange={(e) =>
                      handleAddressChange(
                        "houseNumber",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. 24/A"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
                  />
                </div>

                {/* Street / Area */}

                <div>
                  <label
                    htmlFor="street"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Street / Area
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="street"
                    type="text"
                    value={
                      deliveryAddress.street
                    }
                    onChange={(e) =>
                      handleAddressChange(
                        "street",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Main Road, Unit-3"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
                  />
                </div>

                {/* Landmark */}

                <div>
                  <label
                    htmlFor="landmark"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Landmark
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="landmark"
                    type="text"
                    value={
                      deliveryAddress.landmark
                    }
                    onChange={(e) =>
                      handleAddressChange(
                        "landmark",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Near City Hospital"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
                  />
                </div>

                {/* City */}

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    City
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="city"
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) =>
                      handleAddressChange(
                        "city",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Bhubaneswar"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
                  />
                </div>

                {/* State */}

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    State
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="state"
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) =>
                      handleAddressChange(
                        "state",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Odisha"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
                  />
                </div>

                {/* Pincode */}

                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Pincode
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={
                      deliveryAddress.pincode
                    }
                    onChange={(e) =>
                      handleAddressChange(
                        "pincode",
                        e.target.value.replace(
                          /\D/g,
                          "",
                        ),
                      )
                    }
                    placeholder="e.g. 751001"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                DELIVERY SLOT
            ================================================= */}

            <section className="rounded-3xl bg-white p-5 shadow-lg sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#346739]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 7h11v10H3z" />
                    <path d="M14 10h4l3 3v4h-7z" />
                    <circle
                      cx="7"
                      cy="19"
                      r="1.5"
                    />
                    <circle
                      cx="18"
                      cy="19"
                      r="1.5"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-[#346739] sm:text-2xl">
                  Delivery Slot
                </h2>
              </div>

              <select
                value={deliverySlot}
                onChange={(e) =>
                  setDeliverySlot(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-green-100 sm:text-base"
              >
                <option>
                  Morning (8AM - 12PM)
                </option>

                <option>
                  Afternoon (12PM - 4PM)
                </option>

                <option>
                  Evening (4PM - 8PM)
                </option>
              </select>
            </section>

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <section className="rounded-3xl bg-white p-5 shadow-lg sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#346739]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="M3 10h18" />

                    <path d="M7 15h4" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-[#346739] sm:text-2xl">
                  Payment Method
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* COD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("COD")
                  }
                  className={`rounded-2xl border p-5 text-left transition-all duration-200 active:scale-[0.98] ${
                    paymentMethod === "COD"
                      ? "border-[#346739] bg-green-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Cash on Delivery
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        paymentMethod === "COD"
                          ? "border-[#346739]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "COD" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#346739]" />
                      )}
                    </div>
                  </div>
                </button>

                {/* ONLINE */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("ONLINE")
                  }
                  className={`rounded-2xl border p-5 text-left transition-all duration-200 active:scale-[0.98] ${
                    paymentMethod === "ONLINE"
                      ? "border-[#346739] bg-green-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Online Payment
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Pay securely using Razorpay.
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        paymentMethod === "ONLINE"
                          ? "border-[#346739]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "ONLINE" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#346739]" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside className="h-fit rounded-3xl bg-white p-5 shadow-lg sm:p-6 lg:sticky lg:top-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#346739]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 8h12l1 12H5L6 8Z" />
                  <path d="M9 8a3 3 0 0 1 6 0" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-[#346739] sm:text-2xl">
                Order Summary
              </h2>
            </div>

            {/* Products */}

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-800">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 font-semibold text-gray-800">
                    ₹
                    {item.product.price *
                      item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-6" />

            {/* Price */}

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>

                <span>₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-bold text-gray-900 sm:text-xl">
                <span>Total</span>

                <span>₹{total}</span>
              </div>
            </div>

            {/* Place Order */}

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#346739] py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#2c5c30] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                  <span>
                    {isProcessingPayment
                      ? "Opening Payment..."
                      : "Placing Order..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {paymentMethod === "ONLINE"
                      ? "Pay & Place Order"
                      : "Place Order"}
                  </span>

                  <svg
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />

                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </>
              )}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Your order details will be securely processed.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
