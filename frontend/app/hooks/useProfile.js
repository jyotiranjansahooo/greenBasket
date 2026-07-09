"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profileService";

export default function useProfile() {
  return useQuery({
    queryKey: ["profile"],

    queryFn: async () => {
      const data = await getProfile();
      return data.user;
    },
  });
}