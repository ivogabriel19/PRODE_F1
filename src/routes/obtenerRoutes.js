import express from 'express';
import { obtenerCarrerasPorAnio, obtenerConductoresPorAnio } from '../controllers/obtenerController.js';
const router = express.Router();

router.get('/carreras/:anio', obtenerCarrerasPorAnio);
router.get('/conductores/:anio', obtenerConductoresPorAnio);

export default router;