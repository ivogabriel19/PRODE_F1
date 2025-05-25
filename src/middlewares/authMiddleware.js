import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function verificarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.sendStatus(404);

    req.user = user; // ✅ ahora `req.user` tiene todo el usuario
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

export function verificarRol(requerido) {
  return (req, res, next) => {
    if (req.user?.role === requerido) return next();
    return res.status(403).json({ error: "Acceso denegado." });
  };
}

