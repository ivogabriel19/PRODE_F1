// src/routes/resultados.routes.js
import { Router } from 'express';
import { evaluarProde } from '../controllers/resultadosController.js';

const router = Router();

router.post('/evaluar', evaluarProde);

export default router;
