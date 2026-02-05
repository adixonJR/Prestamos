import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto123"
    );

    req.user = decoded; // id, email, rol
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
