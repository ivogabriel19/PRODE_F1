import express from 'express';
import { submitPrediction } from '../controllers/predictionController.js';
const router = express.Router();

router.post('/submit', submitPrediction);

export default router;