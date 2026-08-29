"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Floating({
  children,
  y = 20,
  duration = 3,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        y,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: ref,
    },
  );

  return <div ref={ref}>{children}</div>;
}
