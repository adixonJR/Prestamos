import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

/* =========================
   REGISTRO
========================= */
router.post("/registro", async (req, res) => {
  try {
    const {
      dni,
      nombres,
      apellido_paterno,
      apellido_materno,
      email,
      password,
      rol,          // CLIENTE | ADMIN
      codigoAdmin   // 👈 SOLO SI ES ADMIN
    } = req.body;

    if (
      !dni ||
      !nombres ||
      !apellido_paterno ||
      !apellido_materno ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    /* =========================
       🔐 VALIDAR ADMIN
    ========================= */
    if (rol === "ADMIN") {
      if (!codigoAdmin) {
        return res.status(400).json({
          message: "Código de administrador requerido",
        });
      }

      if (codigoAdmin !== process.env.ADMIN_CODE) {
        return res.status(403).json({
          message: "Código de administrador inválido",
        });
      }
    }

    // 🔐 Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO usuarios
      (dni, nombres, apellido_paterno, apellido_materno, email, password, rol)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        dni,
        nombres,
        apellido_paterno,
        apellido_materno,
        email,
        passwordHash,
        rol || "CLIENTE",
      ],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ message: "DNI o correo ya registrado" });
          }

          console.error(err);
          return res
            .status(500)
            .json({ message: "Error en la base de datos" });
        }

        res.json({ message: "Usuario registrado correctamente" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const sql = `
    SELECT id, nombres, email, password, rol, estado
    FROM usuarios
    WHERE email = ?
  `;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    // 🚫 Usuario inactivo
    if (user.estado === 0) {
      return res
        .status(403)
        .json({ message: "Usuario deshabilitado" });
    }

    // 🔐 Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCorrecta) {
      return res
        .status(401)
        .json({ message: "Contraseña incorrecta" });
    }

    // 🎟️ Crear token con ROL
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET || "secreto123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombres: user.nombres,
        email: user.email,
        rol: user.rol,
      },
    });
  });
});

export default router;
