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
    <div className="sticky top-28 h-fit rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-[#346739]">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-medium">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Delivery Fee
          </span>

          <span className="font-medium text-green-600">
            {deliveryFee === 0
              ? "FREE"
              : `₹${deliveryFee}`}
          </span>
        </div>

        {deliveryFee > 0 && (
          <p className="text-sm text-gray-500">
            Add products worth ₹
            {500 - subtotal} more for free
            delivery.
          </p>
        )}

        <hr className="border-gray-200" />

        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-[#346739]">
            ₹{total}
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-8 block rounded-2xl bg-[#346739] py-4 text-center text-lg font-semibold text-white transition hover:bg-[#2c5c30]"
      >
        Proceed to Checkout →
      </Link>

      <Link
        href="/products"
        className="mt-3 block text-center text-sm text-gray-500 transition hover:text-[#346739]"
      >
        Continue shopping
      </Link>
    </div>
  );
}