"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/imageUrl";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useProfile from "@/app/hooks/useProfile";
import { updateProfile } from "@/services/profileService";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const { data: user, isPending, error } = useProfile();
  const [preview, setPreview] = useState(null);

  const updateMutation = useMutation({
    mutationFn: updateProfile,

    onSuccess: async () => {
      toast.success("Profile updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });

      window.location.reload();
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = new FormData();

    data.append("name", formData.get("name"));

    data.append("phone", formData.get("phone"));

    data.append("houseNumber", formData.get("houseNumber"));

    data.append("area", formData.get("area"));

    data.append("state", formData.get("state"));

    data.append("pincode", formData.get("pincode"));
    data.append("profileImage", formData.get("profileImage"));

    updateMutation.mutate(data);
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#a3c28f]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#346739] border-r-[#346739]"></div>
          </div>

          <p className="text-lg font-semibold tracking-wide text-[#19591f]">
            Loading Profile...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">Failed to load profile</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black bg-[#81A281] py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-[#d2e4d2] p-8 shadow-lg">
        <h1 className="mb-8 text-center text-4xl font-bold text-[#346739]">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8 flex justify-center">
            <label className="cursor-pointer">
              <Image
                src={
                  preview
                    ? preview
                    : user?.profileImage
                      ? user.profileImage.startsWith("http")
                        ? user.profileImage
                        : `${process.env.NEXT_PUBLIC_API_URL}${user.profileImage}`
                      : "/default/avatar.png"
                }
                alt="Profile"
                width={120}
                height={120}
                className="h-32 w-32 rounded-full object-cover shadow-lg"
              />

              <input
                type="file"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>
          <div>
            <label className="mb-2 block font-semibold">Name</label>

            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Email</label>

            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="w-full rounded-lg border  p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Phone</label>

            <input
              type="text"
              name="phone"
              defaultValue={user?.phone}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">House Number</label>

            <input
              type="text"
              name="houseNumber"
              defaultValue={user?.address?.houseNumber}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Area</label>

            <input
              type="text"
              name="area"
              defaultValue={user?.address?.area}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">State</label>

            <select
              name="state"
              defaultValue={user?.address?.state}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select your state</option>

              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold">Pincode</label>

            <input
              type="text"
              name="pincode"
              defaultValue={user?.address?.pincode}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
