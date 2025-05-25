import express from "express";
import { verificarJWT, verificarRol } from "../middlewares/authMiddleware.js";
import {processPredictions} from "../utils/processPredictions.js";

const router = express.Router();

router.post(
  "/processPredictions",
  verificarJWT,           // 🧾 verifica token y carga usuario
  verificarRol("admin"),  // 🔐 chequea que sea admin
  async (req, res) => {
    try {
      await processPredictions();
      res.status(200).json({ message: "Predicciones procesadas correctamente." });
    } catch (err) {
      res.status(500).json({ error: "Error al procesar predicciones." });
    }
  }
);

export default router;
