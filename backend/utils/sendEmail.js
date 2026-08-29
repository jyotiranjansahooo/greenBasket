export const sendEmail = async (to, subject, html) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",

      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        sender: {
          name: "Green Basket",
          email: "zoro50964@gmail.com",
        },

        to: [
          {
            email: to,
          },
        ],

        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("BREVO ERROR:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("EMAIL SENT:", data.messageId);

    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};
