import express from "express";
import cors from "cors";
import { db } from "./db.js";
import authRoutes from "./routes/auth.js";
import solicitudesRoutes from "./routes/solicitudes.js";
import usuariosRoutes from "./routes/usuarios.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", usuariosRoutes);
app.use("/api", authRoutes);
app.use("/api", solicitudesRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
