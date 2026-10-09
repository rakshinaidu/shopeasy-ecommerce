import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.get("/", (req, res) => res.send("ShopEasy API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port " + (process.env.PORT || 5000))
    );
  })
  .catch((err) => console.error("DB connection error:", err.message));
