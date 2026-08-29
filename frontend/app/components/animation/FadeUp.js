"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.8,
}) {
  const elementRef = useRef(null);

  useGSAP(
    () => {
      if (!elementRef.current) return;

      gsap.fromTo(
        elementRef.current,
        {
          y: 40,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration,
          delay,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
    },
    {
      scope: elementRef,
    },
  );

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}
