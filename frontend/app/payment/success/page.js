import Link from "next/link";
export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5] p-6">
      <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="text-7xl">✅</div>

        <h1 className="mt-6 text-4xl font-bold text-[#346739]">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-500">
          Your order has been placed successfully.
        </p>

        <Link
          href="/orders"
          className="mt-8 inline-block rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white"
        >
          View Orders
        </Link>
      </div>
    </main>
  );
}
