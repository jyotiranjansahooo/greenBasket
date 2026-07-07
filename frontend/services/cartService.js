import api from "@/lib/axios";

/**
 * Get Cart
 */
export async function getCart() {
  const { data } = await api.get("/cart");
  return data;
}

/**
 * Add Product to Cart
 */
export async function addToCart(productId, quantity = 1) {
  const { data } = await api.post("/cart", {
    productId,
    quantity,
  });

  return data;
}

/**
 * Update Quantity
 */
export async function updateCartItem(
  productId,
  quantity
) {
  const { data } = await api.put(
    `/cart/${productId}`,
    { quantity }
  );

  return data;
}

/**
 * Remove Item
 */
export async function removeFromCart(productId) {
  const { data } = await api.delete(
    `/cart/${productId}`
  );

  return data;
}

/**
 * Clear Cart
 */
export async function clearCart() {
  const { data } = await api.delete("/cart");
  return data;
}