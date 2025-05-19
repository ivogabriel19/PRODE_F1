import express from 'express';
import { obtenerCarrerasPorAnio } from '../controllers/obtenerController.js';
const router = express.Router();

router.get('/:anio', obtenerCarrerasPorAnio);

export default router;