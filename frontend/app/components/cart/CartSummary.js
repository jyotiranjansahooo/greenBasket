"use client";

import Link from "next/link";

export default function CartSummary({ items }) {
  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const deliveryFee = subtotal >= 500 ? 0 : 40;

  const total = subtotal + deliveryFee;

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="text-2xl font-bold text-[#346739]">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>
            {deliveryFee === 0
              ? "FREE"
              : `₹${deliveryFee}`}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>

      <Link
        href="/checkout"
        className="
          mt-8
          block
          rounded-xl
          bg-[#346739]
          py-4
          text-center
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-[#2c5c30]
        "
      >
        Proceed to Checkout
      </Link>

    </div>
  );
}