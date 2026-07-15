"use client";

import { useEffect, useState } from "react";

export default function Counter({
  end = 0,
  suffix = "",
  duration = 1500,
}) {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    let current = 0;

    const increment =
      end / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        setCount(end);

        clearInterval(timer);
      } else {
        setCount(
          Math.floor(current)
        );
      }
    }, 16);

    return () =>
      clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}