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

const INITIAL_LOADING_TIME = 2000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();

      const currentUser = data?.user || null;

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error("AUTH CHECK ERROR:", error);
      }

      setUser(null);

      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      // Start timer when initialization begins
      const startTime = Date.now();

      try {
        const data = await getCurrentUser();

        if (!mounted) return;

        const currentUser = data?.user || null;

        setUser(currentUser);
      } catch (error) {
        if (!mounted) return;

        // 401 = normal unauthenticated visitor
        if (error?.response?.status !== 401) {
          console.error("AUTH INITIALIZATION ERROR:", error);
        }

        setUser(null);
      } finally {
        if (!mounted) return;

        // Calculate how long initialization took
        const elapsedTime = Date.now() - startTime;

        // Keep the loader visible for at least 2 seconds
        const remainingTime = Math.max(INITIAL_LOADING_TIME - elapsedTime, 0);

        if (remainingTime > 0) {
          await new Promise((resolve) => {
            setTimeout(resolve, remainingTime);
          });
        }

        if (!mounted) return;

        // Now allow the application to render
        setLoading(false);
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, []);

  const loginUser = async (email, password) => {
    await login(email, password);

    const loggedInUser = await checkUser();

    return loggedInUser;
  };

  const googleLoginUser = async (credential) => {
    await googleLogin(credential);

    const loggedInUser = await checkUser();

    return loggedInUser;
  };

  const registerUser = async (formData) => {
    await register(formData);

    const newUser = await checkUser();

    return newUser;
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      setUser(null);
    }
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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
