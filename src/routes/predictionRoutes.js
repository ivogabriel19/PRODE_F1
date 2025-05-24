import express from 'express';
import { procesarPrediction } from '../controllers/predictionController.js';
import {
  crearPrediccion,
  obtenerMisPredicciones,
  actualizarPrediccion,
  eliminarPrediccion
} from '../controllers/predictionController.js';
import { verificarJWT } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/submit', verificarJWT, crearPrediccion); //FIXME: obsoleto?
router.post('/processPrediction', crearPrediccion); //FIXME: obsoleto?

router.post('/', verificarJWT, crearPrediccion);
router.get('/', verificarJWT, obtenerMisPredicciones);
router.put('/:id', verificarJWT, actualizarPrediccion);
router.delete('/:id', verificarJWT, eliminarPrediccion);

export default router;