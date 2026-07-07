"use client";

import useCart from "@/app/hooks/useCart";
import CartItem from "@/app/components/cart/CartItem";
import CartSummary from "@/app/components/cart/CartSummary";

export default function CartPage() {
  const {
    data: cart,
    isPending,
    error,
  } = useCart();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl">Loading cart...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load cart
        </h1>
      </main>
    );
  }

  const items = cart?.items || [];

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="heading-font mb-8 text-5xl text-[#346739]">
          My Cart 🛒
        </h1>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow">
            <h2 className="text-3xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-4 text-gray-500">
              Add some fresh products to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">

  <div className="space-y-6 lg:col-span-2">
    {items.map((item) => (
      <CartItem
        key={item.product._id}
        item={item}
      />
    ))}
  </div>

  <CartSummary items={items} />

</div>
        )}

      </div>
    </main>
  );
}