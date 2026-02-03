import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, "secreto123");
    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
