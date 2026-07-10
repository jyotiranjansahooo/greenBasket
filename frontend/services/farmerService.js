import api from "@/lib/axios";

export const getFarmerAnalytics = async () => {
  const { data } = await api.get(
    "/farmer/analytics"
  );

  return data;
};

export const getRecentOrders = async () => {
  const { data } = await api.get(
    "/farmer/recent-orders"
  );

  return data;
};
export const updateOrderStatus = async ({
  id,
  status,
}) => {
  const { data } = await api.put(
    `/farmer/orders/${id}/status`,
    { status }
  );

  return data;
};