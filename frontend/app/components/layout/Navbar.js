"use client";


import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingBasket, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useWishlist from "@/app/hooks/useWishlist";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const { data: wishlistData } = useWishlist();

  const wishlistCount = wishlistData?.wishlist?.products?.length || 0;

  return (
    <nav className="animate-fadeDown sticky top-0 z-50 border-green-100 bg-[#8BA888] backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-bold text-green-700"
        >
<Image
  src="/icon.png"
  alt="Green Basket Logo"
  width={46}
  height={46}
  className="transition duration-300 group-hover:rotate-12 group-hover:scale-110"
/>
          <span className="logo-font tracking-wide ">Green Basket</span>
        </Link>

        {/* Desktop Menu */}
        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="relative font-medium  transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="relative font-medium  transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {user?.role === "customer" && (
                <>
                  <Link href="/cart">Cart</Link>

                  <Link href="/orders">My Orders</Link>
                  <Link
                    href="/products"
                    className="relative font-medium  transition duration-300 hover:text-green-600 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Products
                  </Link>
                  <Link
                    href="/wishlist"
                    className="relative font-medium transition hover:text-green-600"
                  >
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {user.role === "farmer" && (
                <Link href="/farmer/dashboard">Dashboard</Link>
              )}

              {user.role === "admin" && (
                <>
                  <Link
                    href="/admin/products"
                    className="relative font-medium  transition hover:text-green-600"
                  >
                    Products
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="relative font-medium  transition hover:text-green-600"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/admin/farmers"
                    className="relative font-medium  transition hover:text-green-600"
                  >
                    Farmers
                  </Link>

                  <Link
                    href="/admin/categories"
                    className="relative font-medium  transition hover:text-green-600"
                  >
                    Categories
                  </Link>
                </>
              )}

              <Link href="/profile">Profile</Link>

              <button
                onClick={async () => {
                  await logoutUser();
                  router.push("/");
                }}
              >
                Logout
              </button>
            </>
          )}
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
        <div className="space-y-4 text-gray-700 bg-white px-6 py-5 shadow-md md:hidden">
          <Link href="/" className="block">
            Home
          </Link>

          <Link href="/products" className="block">
            Products
          </Link>

          {user?.role === "customer" && (
            <>
              <Link href="/cart" className="block">
                Cart
              </Link>

              <Link href="/orders" className="block">
                My Orders
              </Link>
              <Link
  href="/wishlist"
  className="relative font-medium transition hover:text-green-600"
>
  Wishlist
  {wishlistCount > 0 && (
    <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
      {wishlistCount}
    </span>
  )}
</Link>
            </>
          )}

          {(user?.role === "farmer" || user?.role === "admin") && (
            <Link
              href={
                user.role === "farmer"
                  ? "/farmer/dashboard"
                  : "/admin/dashboard"
              }
              className="block"
            >
              Dashboard
            </Link>
          )}

          <Link href="/profile" className="block">
            Profile
          </Link>

          <button
            onClick={async () => {
              await logoutUser();
              router.push("/");
            }}
            className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
