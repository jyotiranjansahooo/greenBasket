"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingBasket } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAF5] via-[#D9F0D1] to-[#A8D5A2] px-6">

      {/* Background blobs */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-10 top-10 h-72 w-72 rounded-full bg-green-300/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl"
      />

      <div className="relative z-10 text-center">

        {/* Floating vegetables */}

        <div className="mb-8 flex justify-center gap-8 text-6xl">

          <motion.span
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🍅
          </motion.span>

          <motion.span
            animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          >
            🥕
          </motion.span>

          <motion.span
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
            }}
          >
            🥬
          </motion.span>

        </div>

        {/* Basket */}

        <motion.div
          animate={{
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-2xl"
        >
          <FaShoppingBasket className="text-7xl text-[#346739]" />
        </motion.div>

        {/* Text */}

        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-8xl font-extrabold text-[#346739]"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-4xl font-bold text-gray-800"
        >
          Oops! Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-4 max-w-xl text-lg text-gray-600"
        >
          Looks like this page wandered off the farm.
          Let&apos;s get you back to fresh products.
        </motion.p>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/"
            className="rounded-2xl bg-[#346739] px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-[#2c5c30]"
          >
            Go Home
          </Link>

          <Link
            href="/products"
            className="rounded-2xl border-2 border-[#346739] px-8 py-4 font-semibold text-[#346739] transition hover:bg-[#346739] hover:text-white"
          >
            Browse Products
          </Link>

        </div>

      </div>
    </main>
  );
}