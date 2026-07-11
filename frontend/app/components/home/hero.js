"use client";

import Link from "next/link";
import Image from "next/image";
import FadeUp from "@/app/components/animation/FadeUp";
import HeroStats from "./HeroStats";
import Floating from "@/app/components/animation/Floating";
import HeroBackground from "./HeroBackground";
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  const { user } = useAuth();
  return (
    <section className="relative overflow-hidden bg-[#F7FAF5]">
      <HeroBackground />
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#9FCB98]/30 blur-3xl"></div>
      <div className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-[#79AE6F]/20 blur-3xl"></div>{" "}
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row">
        {/* Left */}
        <div className="max-w-xl">
          <FadeUp>
            <span className="rounded-full bg-[#9FCB98] px-5 py-2 text-sm font-semibold text-[#346739]">
              🌱 Fresh • Organic • Local
            </span>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h1 className="mt-6 text-6xl font-black leading-tight text-[#1F2937]">
              Fresh From
              <span className="block text-[#346739]">Farm To Home</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Buy fresh vegetables, fruits, grains and dairy products directly
              from trusted local farmers without middlemen.
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-[#346739] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#79AE6F] hover:shadow-xl"
              >
                Shop Now
              </Link>

              {!user && (
                <Link
                  href="/register"
                  className="rounded-full border-2 border-[#346739] px-8 py-4 font-semibold text-[#346739] transition-all duration-300 hover:bg-[#346739] hover:text-white"
                >
                  Become a Farmer
                </Link>
              )}
            </div>
          </FadeUp>

          <FadeUp delay={0.8}>
            <HeroStats />
          </FadeUp>
        </div>

        {/* Right */}

        <FadeUp delay={0.5}>
          <Floating y={15} duration={3}>
            <Image
              src="/blob/blob.svg"
              alt="Farmer"
              width={650}
              height={650}
              priority
              className="drop-shadow-2xl"
            />
          </Floating>
        </FadeUp>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-gray-500">Scroll</span>

          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-[#346739]">
            <div className="mt-1 h-2 w-2 animate-bounce rounded-full bg-[#346739]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
