import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function verificarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  //console.log("Verificando JWT... ", authHeader);
  if (!authHeader) return res.redirect('/api/auth/login');
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Usuario autenticado:", decoded.userId);
    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId);
    if (!user) return res.redirect('/api/auth/login');
    req.user = user;

    next();
  } catch (err) {
    return res.redirect('/api/auth/login');
  }
}

export function verificarRol(requerido) {
  return async (req, res, next) => {
    //console.log("Verificando rol del usuario:", req.user?.role);
    if (requerido === "any") return next();
    if (req.user?.role === requerido) return next();
    return res.status(403).json({ error: "Acceso denegado." });
  };
}

