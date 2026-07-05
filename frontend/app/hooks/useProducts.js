"use client";

import { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/services/productService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedProducts();
        setProducts(data.products || []);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading };
}