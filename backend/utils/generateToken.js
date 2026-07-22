import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log("NODE_ENV:", process.env.NODE_ENV);

  console.log({
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  partitioned: true,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
  console.log("Cookie sent");
};

export default generateToken;
