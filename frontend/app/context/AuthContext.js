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
} from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  const checkUser = useCallback(async () => {
    try {
      const { user } = await getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once when app loads
  useEffect(() => {
    async function initialize() {
      await checkUser();
    }

    initialize();
  }, [checkUser]);

  // Login
  const loginUser = async (email, password) => {
    const data = await login(email, password);

    await checkUser();

    return data;
  };

  // Register
  const registerUser = async (formData) => {
    const data = await register(formData);

    await checkUser();

    return data;
  };

  // Logout
  const logoutUser = async () => {
    await logout();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}