"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  login,
  register,
  logout,
  getCurrentUser,
  googleLogin,
} from "@/services/authService";

import FullScreenLoader from "@/app/components/common/FullScreenLoader";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const checkUser = useCallback(
    async () => {
      try {
        const data =
          await getCurrentUser();

        setUser(data.user);

        return data.user;
      } catch (error) {
        if (
          error.response?.status !==
          401
        ) {
          console.error(error);
        }

        setUser(null);

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    async function init() {
      await checkUser();
    }

    init();
  }, [checkUser]);

  // Login
  const loginUser = async (
    email,
    password
  ) => {
    await login(email, password);

    // Wait for cookie to persist
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    const loggedInUser =
      await checkUser();

    return loggedInUser;
  };

  // Google Login
  const googleLoginUser = async (
    credential
  ) => {
    await googleLogin(
      credential
    );

    // Wait for cookie to persist
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    const loggedInUser =
      await checkUser();

    return loggedInUser;
  };

  // Register
  const registerUser = async (
    formData
  ) => {
    await register(formData);

    // Wait for cookie to persist
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    const newUser =
      await checkUser();

    return newUser;
  };

  // Logout
  const logoutUser = async () => {
    await logout();

    setUser(null);
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        googleLoginUser,
        registerUser,
        logoutUser,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}