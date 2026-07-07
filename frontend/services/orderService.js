import api from "@/lib/axios";

/**
 * Place Order
 */
export async function placeOrder(orderData) {
  const { data } = await api.post("/orders", orderData);
  return data;
}

/**
 * Customer Orders
 */
export async function getMyOrders() {
  const { data } = await api.get("/orders/my-orders");
  return data;
}

/**
 * Farmer Orders
 */
export async function getFarmerOrders() {
  const { data } = await api.get("/orders/farmer-orders");
  return data;
}
/**
 * Update Order Status
 */
export async function updateOrderStatus(id, status) {
  const { data } = await api.put(`/orders/${id}/status`, {
    status,
  });

  return data;
}