"use client";

import { useQuery } from "@tanstack/react-query";
import { getFarmerOrders } from "@/services/orderService";

export default function useFarmerOrders() {
  return useQuery({
    queryKey: ["farmer-orders"],
    queryFn: () =>
      getFarmerOrders().then(
        (data) => data.orders || []
      ),
  });
}