// src/routes/resultados.routes.js
import { Router } from 'express';
import { evaluarProde, obtenerResultadosCarrera } from '../controllers/resultadosController.js';

const router = Router();

router.post('/evaluar', evaluarProde);


// GET /api/resultados/:anio/:nombreCarrera
router.get('/:anio/:nombreCarrera', obtenerResultadosCarrera);


export default router;
