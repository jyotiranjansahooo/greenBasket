import api from "@/lib/axios";

export const createPaymentOrder =
  async (amount) => {
    const { data } =
      await api.post(
        "/payment/create-order",
        {
          amount,
        }
      );

    return data;
  };