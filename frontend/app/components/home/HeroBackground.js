"use client";

import Image from "next/image";
import Floating from "@/app/components/animation/Floating";

export default function HeroBackground() {
  return (
    <>
      {/* Decorative background blob */}
      <Floating y={12} duration={8}>
        <Image
          src="/blob/blob.svg"
          alt=""
          width={350}
          height={350}
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-24 -z-10 opacity-40"
        />
      </Floating>

      {/* Decorative background blob */}
      <Floating y={10} duration={10}>
        <Image
          src="/blob/blob2.svg"
          alt=""
          width={450}
          height={450}
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 -z-10 opacity-30"
        />
      </Floating>

      {/* Decorative background blob */}
      <Floating y={8} duration={12}>
        <Image
          src="/blob/blob3.svg"
          alt=""
          width={250}
          height={250}
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute right-1/3 top-12 -z-10 opacity-25"
        />
      </Floating>
    </>
  );
}
