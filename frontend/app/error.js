"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAF5] px-6">
      <div className="max-w-xl text-center">

        <motion.div
          animate={{
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-8xl"
        >
          ⚠️
        </motion.div>

        <h1 className="mt-8 text-5xl font-bold text-[#346739]">
          Something went wrong
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          We couldn`t load this page right now.
          Please try again.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button
            onClick={reset}
            className="rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white transition hover:bg-[#2c5c30]"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-2xl border-2 border-[#346739] px-8 py-4 font-semibold text-[#346739] transition hover:bg-[#346739] hover:text-white"
          >
            Go Home
          </Link>

        </div>
      </div>
    </main>
  );
}