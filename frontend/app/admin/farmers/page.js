"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getAllFarmers,
  verifyFarmer,
} from "@/services/adminService";

export default function AdminFarmersPage() {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["admin-farmers"],
    queryFn: getAllFarmers,
  });

  const mutation = useMutation({
    mutationFn: verifyFarmer,

    onSuccess: () => {
      toast.success("Farmer verified");

      queryClient.invalidateQueries({
        queryKey: ["admin-farmers"],
      });
    },

    onError: () => {
      toast.error("Verification failed");
    },
  });

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Failed to load farmers.
      </main>
    );
  }

  const farmers = data?.farmers || [];

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10 text-black">
      <h1 className="mb-8 text-5xl font-bold text-[#346739]">
        Farmers
      </h1>

      <div className="space-y-4">
        {farmers.map((farmer) => (
          <div
            key={farmer._id}
            className="rounded-2xl bg-white p-6 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {farmer.name}
                </h2>

                <p>{farmer.email}</p>

                <p>{farmer.phone}</p>

                <p>{farmer.farmLocation}</p>
              </div>

              {farmer.isVerified ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                  Verified
                </span>
              ) : (
                <button
                  onClick={() =>
                    mutation.mutate(farmer._id)
                  }
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}