import api from "@/lib/axios";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
};

export const register = async (formData) => {
  const { data } = await api.post("/auth/register", formData);

  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");

  return data;
};
export async function googleLogin(
  credential
) {
  const { data } = await api.post(
    "/auth/google",
    {
      credential,
    }
  );

  return data;
}