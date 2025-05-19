// src/routes/resultados.routes.js
import { Router } from 'express';
import { evaluarProde, obtenerResultadoCompletoCarrera } from '../controllers/resultadosController.js';

const router = Router();

router.post('/evaluar', evaluarProde);


// GET /api/resultados/:anio/:nombreCarrera
router.get('/:anio/:nombreCarrera', obtenerResultadoCompletoCarrera);


export default router;
