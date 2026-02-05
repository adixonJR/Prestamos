import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* =========================
   PERFIL DEL USUARIO
========================= */
router.get("/perfil", verifyToken, (req, res) => {
  const sql = `
    SELECT id, dni, nombres, apellido_paterno, apellido_materno, email, rol
    FROM usuarios
    WHERE id = ?
  `;

  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado" });
    }

    res.json(results[0]);
  });
});

export default router;
