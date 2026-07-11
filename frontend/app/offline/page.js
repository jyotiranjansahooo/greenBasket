"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaWifi } from "react-icons/fa";

export default function OfflinePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#F7FAF5] via-[#D9F0D1] to-[#A8D5A2] px-6">

      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />

      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl" />

      <div className="z-10 max-w-xl text-center">

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-2xl"
        >
          <FaWifi className="text-7xl text-red-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 text-5xl font-bold text-[#346739]"
        >
          You`re Offline
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-gray-600"
        >
          Please check your internet connection and try again.
        </motion.p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white transition hover:bg-[#2c5c30]"
          >
            Retry
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