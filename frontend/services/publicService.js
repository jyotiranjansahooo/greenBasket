import api from "@/lib/axios";

export const getHeroStats = async () => {
  const response = await api.get(
    "/public/hero-stats"
  );


  return response.data.stats;
};