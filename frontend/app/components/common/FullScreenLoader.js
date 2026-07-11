"use client";

import { FaShoppingBasket } from "react-icons/fa";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#F7FAF5] via-[#D9F0D1] to-[#A8D5A2]">
      <div className="flex flex-col items-center">
        <div className="animate-bounce rounded-full bg-white p-8 shadow-2xl">
          <FaShoppingBasket className="text-7xl text-[#346739]" />
        </div>

        <h1 className="mt-8 text-5xl font-bold text-[#346739]">
          Green Basket
        </h1>

        <div className="mt-6 flex gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-600" />
          <div
            className="h-3 w-3 animate-pulse rounded-full bg-green-600"
            style={{ animationDelay: "200ms" }}
          />
          <div
            className="h-3 w-3 animate-pulse rounded-full bg-green-600"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}