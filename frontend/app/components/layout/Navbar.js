"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingBasket, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import useWishlist from "@/app/hooks/useWishlist";

import { FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const { data: wishlistData } = useWishlist();

  const wishlistCount = wishlistData?.wishlist?.products?.length || 0;

  return (
    <nav className="animate-fadeDown sticky top-0 z-50 border-green-100 bg-[#71ac7d] backdrop-blur-lg">
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

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="nav-link">
            Home
          </Link>
          {(!user || user.role === "customer") && (
            <Link href="/about" className="nav-link">
              About
            </Link>
          )}

          {!user ? (
            <>
              <Link href="/login" className="nav-link">
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
                  <Link href="/cart" className="nav-link">
                    Cart
                  </Link>

                  <Link href="/orders" className="nav-link">
                    My Orders
                  </Link>
                  <Link href="/products" className="nav-link">
                    Products
                  </Link>
                  <Link href="/wishlist" className="nav-link">
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {user?.role === "farmer" && (
                <>
                  <Link href="/farmer/dashboard" className="nav-link">
                    Dashboard
                  </Link>

                  {user.isVerified && (
                    <>
                      <Link href="/farmer/products/add" className="nav-link">
                        Add Product
                      </Link>

                      <Link href="/farmer/products" className="nav-link">
                        Manage Products
                      </Link>
                      <Link href="/farmer/help" className="nav-link">
                        Help
                      </Link>
                    </>
                  )}
                </>
              )}

              {user.role === "admin" && (
                <>
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
                  <Link href="/admin/orders" className="nav-link">
                    Orders
                  </Link>
                </>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="overflow-hidden rounded-full border-2 border-green-600 transition hover:scale-105"
                >
                  <Image
                    src={
                      user?.profileImage
                        ? user.profileImage.startsWith("http")
                          ? user.profileImage
                          : `${process.env.NEXT_PUBLIC_API_URL}${user.profileImage}`
                        : "/default/avatar.png"
                    }
                    alt={user?.name || "Profile"}
                    width={44}
                    height={44}
                    className="h-11 w-11 object-cover"
                  />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-14 z-50 w-52 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                    <div className="border-b p-3">
                      <p className="font-semibold text-gray-800">
                        {user?.name}
                      </p>

                      <p className="truncate text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setShowMenu(false)}
                      className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-green-50"
                    >
                      <FiUser />
                      Profile
                    </Link>

                    <button
                      onClick={async () => {
                        await logoutUser();
                        setShowMenu(false);
                        router.push("/");
                      }}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
  <div className="space-y-4 bg-white px-6 py-5 text-gray-700 shadow-md md:hidden">
    <Link href="/" className="block">
      Home
    </Link>

    {(!user || user.role === "customer") && (
      <Link href="/products" className="block">
        Products
      </Link>
    )}

    {/* Guest menu */}
    {!user && (
      <>
        <Link href="/login" className="block">
          Login
        </Link>

        <Link href="/register" className="block">
          Register
        </Link>
      </>
    )}

    {/* Customer menu */}
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
          className="relative block"
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

    {/* Farmer menu */}
    {user?.role === "farmer" && (
      <>
        <Link
          href="/farmer/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          href="/farmer/products"
          className="block"
        >
          My Products
        </Link>

        <Link
          href="/farmer/products/new"
          className="block"
        >
          Add Product
        </Link>

        <Link
          href="/farmer/orders"
          className="block"
        >
          Orders
        </Link>
      </>
    )}

    {/* Admin menu */}
    {user?.role === "admin" && (
      <>
        <Link
          href="/admin/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/farmers"
          className="block"
        >
          Farmers
        </Link>

        <Link
          href="/admin/categories"
          className="block"
        >
          Categories
        </Link>

        <Link
          href="/admin/orders"
          className="block"
        >
          Orders
        </Link>

        <Link
          href="/admin/products"
          className="block"
        >
          Products
        </Link>

        <Link
          href="/admin/users"
          className="block"
        >
          Users
        </Link>
      </>
    )}

    {/* Show only when logged in */}
    {user && (
      <>
        <Link
          href="/profile"
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#71AC7D]
            px-4
            py-2
            text-white
            transition
            hover:bg-green-600
          "
        >
          <FiUser className="text-lg" />
          <span>Profile</span>
        </Link>

        <button
          onClick={async () => {
            await logoutUser();
            router.push("/");
          }}
          className="
            flex
            w-full
            items-center
            gap-2
            rounded-lg
            bg-red-500
            px-4
            py-2
            text-white
            transition
            hover:bg-red-600
          "
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </>
    )}
  </div>
)}
    </nav>
  );
}
