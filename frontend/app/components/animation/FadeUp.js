"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function FadeUp({
  children,
  delay = 0,
  duration = 1,
}) {
  const elementRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      elementRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
      }
    );
  });

  return <div ref={elementRef}>{children}</div>;
}