import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";


dotenv.config();
await connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



app.use("/api/auth", authRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});