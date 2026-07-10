import api from "@/lib/axios";

export const getAllFarmers = async () => {
  const { data } = await api.get("/admin/farmers");

  return data;
};

export const verifyFarmer = async (id) => {
  const { data } = await api.put(
    `/admin/farmers/${id}/verify`
  );

  return data;
};

export const getPlatformAnalytics = async () => {
  const { data } = await api.get(
    "/admin/analytics"
  );

  return data;
};

export const getAllOrders = async () => {
  const { data } = await api.get(
    "/admin/orders"
  );

  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get(
    "/admin/products"
  );

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(
    `/products/${id}`
  );

  return data;
};

export const toggleFeaturedProduct = async (
  id
) => {
  const { data } = await api.put(
    `/admin/products/${id}/featured`
  );

  return data;
};