import razorpay from "../config/razorpay.js";

export const createPaymentOrder =
  async (req, res) => {
    try {
      const { amount } = req.body;

      const options = {
        amount: amount * 100,
        currency: "INR",

        receipt:
          "receipt_" +
          Date.now(),
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Payment creation failed",
      });
    }
  };