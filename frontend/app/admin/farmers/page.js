"use client";

import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getAllFarmers,
  verifyFarmer,
} from "@/services/adminService";

export default function AdminFarmersPage() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["admin-farmers"],
    queryFn: getAllFarmers,
  });

  const mutation = useMutation({
    mutationFn: verifyFarmer,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-farmers"],
      });
    },

    onError: (error) => {

  toast.error(
    error.response?.data?.message ||
    "Verification failed"
  );
},
  });

  const farmers = data?.farmers || [];

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-[#346739]">
          Loading farmers...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load farmers
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAF5] p-10 text-black">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold text-[#346739]">
          Farmer Verification 🌾
        </h1>

        {farmers.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No farmers found
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {farmers.map((farmer) => (
              <div
                key={farmer._id}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                <div className="flex items-center gap-4">

                  <Image
                    src={
                      farmer.profileImage
                        ? farmer.profileImage.startsWith("http")
                          ? farmer.profileImage
                          : `${process.env.NEXT_PUBLIC_API_URL}${farmer.profileImage}`
                        : "/default/avatar.png"
                    }
                    alt={farmer.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {farmer.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {farmer.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">

                  <p>
                    <span className="font-semibold">
                      Phone:
                    </span>{" "}
                    {farmer.phone || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Farm Location:
                    </span>{" "}
                    {farmer.farmLocation || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Farming Method:
                    </span>{" "}
                    {farmer.farmingMethod || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Crops:
                    </span>{" "}
                    {farmer.cropTypes?.length
                      ? farmer.cropTypes.join(", ")
                      : "-"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Status:
                    </span>

                    <span
                      className={`ml-2 rounded-full px-3 py-1 text-sm ${
                        farmer.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {farmer.isVerified
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </p>

                </div>

                <button
                  onClick={() =>
                    mutation.mutate(farmer._id)
                  }
                  disabled={mutation.isPending}
                  className={`mt-6 w-full rounded-xl py-3 font-semibold text-white transition ${
                    farmer.isVerified
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {farmer.isVerified
                    ? "Remove Verification"
                    : "Verify Farmer"}
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}