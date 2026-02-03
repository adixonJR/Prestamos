import { verificarToken } from "../middlewares/auth.js";

router.get("/me", verificarToken, (req, res) => {
  const sql = "SELECT id, dni, nombres, email FROM usuarios WHERE id = ?";

  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error DB" });
    }

    res.json(results[0]);
  });
});
