"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingBasket, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="animate-fadeDown sticky top-0 z-50 border-green-100 bg-[#8BA888] backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
       <Link
  href="/"
  className="group flex items-center gap-2 text-2xl font-bold text-green-700"
>
  <FaShoppingBasket className="transition duration-300 group-hover:rotate-12 group-hover:scale-110" />

  <span className="logo-font tracking-wide ">
    Green Basket
  </span>
</Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="relative font-medium text-gray-800 transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full">
            Home
          </Link>

          <Link href="/products" className="relative font-medium text-gray-800 transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full">
            Products
          </Link>

          <Link href="/farmer/dashboard" className="relative font-medium text-gray-800 transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full">
            Sell
          </Link>

          <Link href="/login" className="relative font-medium text-gray-800 transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full">
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="space-y-4 bg-white px-6 py-5 shadow-md md:hidden">
          <Link href="/" className="block">
            Home
          </Link>

          <Link href="/products" className="block">
            Products
          </Link>

          <Link href="/farmer/dashboard" className="block">
            Sell
          </Link>

          <Link
    href="/login"
    className="rounded-full border border-green-600 px-6 py-2.5 font-medium text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white"
>
    Login
</Link>

          <Link
            href="/register"
className="rounded-full bg-green-600 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}