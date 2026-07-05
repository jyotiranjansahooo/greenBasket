"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
       const data = await getCategories();

console.log("API Response:", data);

setCategories(data.categories || []);
      } catch (err) {
  console.error("Category Error:", err);
  console.error("Response:", err.response);

  setError(err.response?.data?.message || "Failed to load categories");
} finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}