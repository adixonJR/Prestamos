import express from "express";
import { db } from "../db.js";

const router = express.Router();

// 🔹 Limpia strings vacíos
const clean = (v) => (v === "" ? null : v);

// 🔹 Convierte fechas a formato MySQL YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;

  if (typeof date === "string" && date.includes("/")) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }

  return date;
};

// ==============================
// 📌 REGISTRAR SOLICITUD
// ==============================
router.post("/solicitud", (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO solicitudes (
      email, celular, nombres, apellido_paterno, apellido_materno, dni, fecha_nacimiento,
      departamento, distrito, direccion,
      ref_nombres, ref_telefono, ref_parentesco,
      ocupacion, otra_ocupacion, ingresos, banco, otro_banco, tipo_cuenta, cci,
      tipo_prestamo, monto, plazo, interes, total, fecha_pago
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    clean(data.email),
    clean(data.celular),
    clean(data.nombres),
    clean(data.apellidoPaterno),
    clean(data.apellidoMaterno),
    clean(data.dni),
    formatDate(clean(data.fechaNacimiento)),

    clean(data.departamento),
    clean(data.distrito),
    clean(data.direccion),

    clean(data.refNombres),
    clean(data.refTelefono),
    clean(data.refParentesco),

    clean(data.ocupacion),
    clean(data.otraOcupacion),
    clean(data.ingresos),
    clean(data.banco),
    clean(data.otroBanco),
    clean(data.tipoCuenta),
    clean(data.cci),

    clean(data.tipo),
    clean(data.monto),
    clean(data.plazo),
    clean(data.interesTotal),
    clean(data.total),
    formatDate(clean(data.fecha))
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ MySQL error:", err.sqlMessage);
      return res.status(500).json({
        error: "Error al guardar solicitud",
      });
    }

    res.json({
      message: "Solicitud registrada correctamente",
      id: result.insertId,
    });
  });
});

// ==============================
// 📌 OBTENER SOLICITUDES POR DNI
// ==============================
router.get("/solicitudes/:dni", (req, res) => {
  const { dni } = req.params;

  const sql = `
    SELECT *
    FROM solicitudes
    WHERE dni = ?
    ORDER BY id DESC
  `;

  db.query(sql, [dni], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener solicitudes:", err.sqlMessage);
      return res.status(500).json({
        error: "Error al obtener solicitudes",
      });
    }

    res.json(results);
  });
});

export default router;
