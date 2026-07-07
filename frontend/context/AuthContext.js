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

 const checkUser = useCallback(async () => {
  try {

    const data = await getCurrentUser();


    setUser(data.user);


    return data.user;
  } catch (error) {
    console.error("❌ checkUser failed:", error);

    setUser(null);
    return null;
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    async function init() {
      await checkUser();
    }

    init();
  }, [checkUser]);

  // Login
  const loginUser = async (email, password) => {
    await login(email, password);

    const loggedInUser = await checkUser();

    return loggedInUser;
  };

  // Register
  const registerUser = async (formData) => {
    await register(formData);

    const newUser = await checkUser();

    return newUser;
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
  return useContext(AuthContext);
}