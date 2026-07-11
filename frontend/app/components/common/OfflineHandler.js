"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useOnlineStatus from "@/app/hooks/useOnlineStatus";

export default function OfflineHandler() {
  const router = useRouter();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      router.push("/offline");
    }
  }, [isOnline, router]);

  return null;
}