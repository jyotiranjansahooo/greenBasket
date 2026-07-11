"use client";

import { useEffect, useState } from "react";

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return navigator.onLine;
  });

  useEffect(() => {
    const goOnline = () => setIsOnline(true);

    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);

    window.addEventListener(
      "offline",
      goOffline
    );

    return () => {
      window.removeEventListener(
        "online",
        goOnline
      );

      window.removeEventListener(
        "offline",
        goOffline
      );
    };
  }, []);

  return isOnline;
}