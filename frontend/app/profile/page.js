"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useProfile from "@/app/hooks/useProfile";
import { updateProfile } from "@/services/profileService";

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    error,
  } = useProfile();

  const updateMutation = useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      toast.success("Profile updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    updateMutation.mutate({
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    });
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Profile...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl text-red-500">
          Failed to load profile
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black bg-[#F7FAF5] py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-4xl font-bold text-[#346739]">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block font-semibold">
              Name
            </label>

            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              defaultValue={user?.phone}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Address
            </label>

            <textarea
              name="address"
              rows={4}
              defaultValue={user?.address}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {updateMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

      </div>
    </main>
  );
}