import api from "@/lib/axios";

/**
 * Get Logged-in User Profile
 */
export async function getProfile() {
  const { data } = await api.get("/auth/profile");
  return data;
}

/**
 * Update Logged-in User Profile
 */
export async function updateProfile(profileData) {
  const { data } = await api.put(
    "/auth/profile",
    profileData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
}