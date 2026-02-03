import express from "express";
import cors from "cors";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
