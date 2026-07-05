"use client";

import Image from "next/image";
import Floating from "@/app/components/animation/Floating";

export default function HeroBackground() {
  return (
    <>
      <Floating y={20} duration={7}>
        <Image
          src="/blob/blob.svg"
          alt="blob1"
          width={350}
          height={350}
          priority
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-24 -z-10 opacity-40"
        />
      </Floating>

      <Floating y={15} duration={9}>
        <Image
          src="/blob/blob2.svg"
          alt="blob 2"
          width={450}
          height={450}
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 -z-10 opacity-30"
        />
      </Floating>

      <Floating y={10} duration={11}>
        <Image
          src="/blob/blob3.svg"
          alt="blob 3"
          width={250}
          height={250}
          aria-hidden="true"
          className="pointer-events-none absolute right-1/3 top-12 -z-10 opacity-25"
        />
      </Floating>
    </>
  );
}