import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Green Basket <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};
