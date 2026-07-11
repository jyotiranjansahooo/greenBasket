"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaShoppingBasket } from "react-icons/fa";

export default function Loading() {
  const basketRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  const tomatoRef = useRef(null);
  const carrotRef = useRef(null);
  const lettuceRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    gsap.to(basketRef.current, {
      y: -12,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(logoRef.current, {
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });

    gsap.fromTo(
      barRef.current,
      {
        width: "0%",
      },
      {
        width: "100%",
        duration: 2.5,
        repeat: -1,
        ease: "power2.inOut",
      }
    );

    tl.set(
      [tomatoRef.current, carrotRef.current, lettuceRef.current],
      {
        opacity: 0,
      }
    );

    tl.fromTo(
      tomatoRef.current,
      {
        x: -300,
        y: -220,
        scale: 0.4,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }
    );

    tl.fromTo(
      carrotRef.current,
      {
        x: 300,
        y: -180,
        scale: 0.4,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.7"
    );

    tl.fromTo(
      lettuceRef.current,
      {
        x: 0,
        y: 250,
        scale: 0.4,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.7"
    );

    tl.to(
      [tomatoRef.current, carrotRef.current, lettuceRef.current],
      {
        scale: 0,
        opacity: 0,
        duration: 0.5,
      },
      "+=0.5"
    );
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#F7FAF5] via-[#D9F0D1] to-[#A8D5A2]">
      <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-green-300/30 blur-3xl" />

      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl" />

      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="relative mb-10 h-36 w-36">
          <div
            ref={tomatoRef}
            className="absolute left-10 top-8 text-5xl"
          >
            🍅
          </div>

          <div
            ref={carrotRef}
            className="absolute right-8 top-10 text-5xl"
          >
            🥕
          </div>

          <div
            ref={lettuceRef}
            className="absolute bottom-0 left-14 text-5xl"
          >
            🥬
          </div>

          <div
            ref={basketRef}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-white shadow-2xl"
          >
            <FaShoppingBasket className="text-7xl text-[#346739]" />
          </div>
        </div>

        <h1
          ref={logoRef}
          className="text-6xl font-extrabold tracking-wide text-[#346739]"
        >
          Green Basket
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Fresh from farms to your home
        </p>

        <div className="mt-10 h-3 w-80 overflow-hidden rounded-full bg-white/60 shadow-xl">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-lime-400"
          />
        </div>
      </div>
    </main>
  );
}