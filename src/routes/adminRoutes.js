import express from "express";
import { verificarJWT, verificarRol } from "../middlewares/authMiddleware.js";
import { procesarPredicciones, listarUsuarios } from '../controllers/adminController.js';

const router = express.Router();

router.post(
  "/processPredictions",
  verificarJWT,           // 🧾 verifica token y carga usuario
  verificarRol("admin"),  // 🔐 chequea que sea admin
  procesarPredicciones
);
router.get('/getUsers', verificarJWT, verificarRol('admin'), listarUsuarios);


export default router;
