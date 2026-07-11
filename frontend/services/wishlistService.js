import api from "@/lib/axios";

export const getWishlist = async () => {
  const { data } = await api.get(
    "/wishlist"
  );

  return data;
};

export const toggleWishlist = async (
  productId
) => {
  const { data } = await api.put(
    "/wishlist/toggle",
    {
      productId,
    }
  );

  return data;
};