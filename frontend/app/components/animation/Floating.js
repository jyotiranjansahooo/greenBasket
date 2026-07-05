"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Floating({
  children,
  y = 20,
  duration = 2.5,
}) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      y,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return <div ref={ref}>{children}</div>;
}