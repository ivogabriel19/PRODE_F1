import express from 'express';
import { submitPrediction, procesarPrediction } from '../controllers/predictionController.js';
const router = express.Router();

router.post('/submit', submitPrediction);
router.post('/processPrediction', procesarPrediction);

export default router;