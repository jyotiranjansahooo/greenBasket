import Link from "next/link";
export default function PaymentFailedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5] p-6">
      <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

        <div className="text-7xl">❌</div>

        <h1 className="mt-6 text-4xl font-bold text-red-600">
          Payment Failed
        </h1>

        <p className="mt-4 text-gray-500">
          Something went wrong while processing your payment.
        </p>

        <Link
          href="/checkout"
          className="mt-8 inline-block rounded-2xl bg-red-500 px-8 py-4 font-semibold text-white"
        >
          Try Again
        </Link>

      </div>
    </main>
  );
}