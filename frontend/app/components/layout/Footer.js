"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLeaf,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative  overflow-hidden bg-linear-to-br from-[#6D9773] via-[#8BA888] to-[#A4C3A2] text-white">
      {/* Background blobs */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl"
      />

      {/* Floating leaves */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute left-10 top-10 text-4xl text-white/20"
      >
        <FaLeaf />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute right-20 top-20 text-5xl text-white/20"
      >
        <FaLeaf />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Top section */}

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="mt-2 text-white/80">Fresh products available</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="mt-2 text-white/80">Local farmers connected</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold">10k+</h3>
            <p className="mt-2 text-white/80">Happy customers</p>
          </motion.div>
        </div>

        {/* Main footer */}

        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <Link href="/" className="group flex items-center gap-4">
              <Image
                src="/icon.png"
                alt="Green Basket"
                width={60}
                height={60}
                className="transition duration-300 group-hover:rotate-12 group-hover:scale-110"
              />

              <div>
                <h2 className="logo-font text-3xl font-bold">Green Basket</h2>

                <p className="mt-1 text-white/80">Fresh from farm to home.</p>
              </div>
            </Link>

            <p className="mt-6 leading-7 text-white/70">
              Bringing fresh vegetables, fruits, and organic products directly
              from local farmers to your doorstep.
            </p>
          </div>

          {/* Explore */}

          <div>
            <h3 className="mb-6 text-xl font-bold">Explore</h3>

            <div className="space-y-4 text-white/80">
              <Link
                href="/"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Products
              </Link>

              <Link
                href="/wishlist"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-6 text-xl font-bold">Support</h3>

            <div className="space-y-4 text-white/80">
              <Link
                href="/profile"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Profile
              </Link>

              <Link
                href="/orders"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Orders
              </Link>

              <Link
                href="/about"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block transition hover:translate-x-2 hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="mb-6 text-xl font-bold">Stay Updated</h3>

            <p className="mb-4 text-white/70">
              Get fresh offers and seasonal updates.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/50 backdrop-blur-xl outline-none"
              />

              <button
                className="
                  w-full
                  rounded-2xl
                  bg-white
                  py-4
                  font-semibold
                  text-[#346739]
                  transition
                  hover:scale-105
                "
              >
                Subscribe
              </button>
            </div>

            <div className="mt-8 flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaGithub].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{
                      y: -6,
                      scale: 1.1,
                    }}
                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    backdrop-blur-xl
                  "
                  >
                    <Icon />
                  </motion.a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-white/20 pt-8 text-center text-white/60">
          © {new Date().getFullYear()} Green Basket · Freshness Delivered Daily
          🌿
        </div>
      </div>
    </footer>
  );
}
