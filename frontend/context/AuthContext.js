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

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // Check current authenticated user
  // =====================================================

  const checkUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();

      const currentUser = data?.user || null;

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      // 401 simply means the visitor is not logged in.
      // Don't log it as an application error.

      if (error.response?.status !== 401) {
        console.error(
          "AUTH CHECK ERROR:",
          error,
        );
      }

      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // Initial authentication check
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const data = await getCurrentUser();

        if (!mounted) return;

        setUser(data?.user || null);
      } catch (error) {
        if (
          mounted &&
          error.response?.status !== 401
        ) {
          console.error(
            "AUTH INITIALIZATION ERROR:",
            error,
          );
        }

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // Login
  // =====================================================

  const loginUser = async (
    email,
    password,
  ) => {
    await login(email, password);

    // No artificial 500ms delay.
    return await checkUser();
  };

  // =====================================================
  // Google Login
  // =====================================================

  const googleLoginUser = async (
    credential,
  ) => {
    await googleLogin(credential);

    // No artificial 500ms delay.
    return await checkUser();
  };

  // =====================================================
  // Register
  // =====================================================

  const registerUser = async (
    formData,
  ) => {
    await register(formData);

    // No artificial 500ms delay.
    return await checkUser();
  };

  // =====================================================
  // Logout
  // =====================================================

  const logoutUser = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  };

  // =====================================================
  // Context
  // =====================================================

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

// =======================================================
// useAuth hook
// =======================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}
