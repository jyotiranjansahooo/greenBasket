import api from "@/lib/axios";

export const getHeroStats = async () => {
  const response = await api.get(
    "/public/hero-stats"
  );

  console.log("publicservice data",response.data);

  return response.data.stats;
};