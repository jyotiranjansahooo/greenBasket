"use client";

import Link from "next/link";
import useCart from "@/app/hooks/useCart";
import CartItem from "@/app/components/cart/CartItem";
import CartSummary from "@/app/components/cart/CartSummary";
import PageTransition from "@/app/components/common/PageTransition";

export default function CartPage() {
  const {
    data: cart,
    isPending,
    error,
  } = useCart();

  if (isPending) {
  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 h-12 w-64 animate-pulse rounded-xl bg-green-100" />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-white p-6 shadow"
              >
                <div className="flex gap-5">
                  <div className="h-28 w-28 animate-pulse rounded-2xl bg-gray-200" />

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />

                    <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-200" />

                    <div className="mt-5 h-10 w-40 animate-pulse rounded-xl bg-gray-200" />
                  </div>

                  <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

            <div className="mt-8 space-y-4">
              <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mt-10 h-14 w-full animate-pulse rounded-2xl bg-green-200" />
          </div>
        </div>
      </div>
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
    <PageTransition>
    <main className="min-h-screen bg-[#F7FAF5] p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="heading-font mb-8 text-5xl text-[#346739]">
          My Cart 🛒
        </h1>

        {items.length === 0 ? (
  <div className="rounded-3xl bg-white p-16 text-center shadow">
    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-green-100 text-6xl">
      🛒
    </div>

    <h2 className="mt-8 text-4xl font-bold text-[#346739]">
      Your cart is empty
    </h2>

    <p className="mt-4 text-lg text-gray-500">
      Fresh vegetables and fruits are waiting for you.
    </p>

    <Link
      href="/products"
      className="mt-8 inline-block rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white transition hover:bg-[#2c5c30]"
    >
      Explore Products
    </Link>
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
    </PageTransition>
  );
}