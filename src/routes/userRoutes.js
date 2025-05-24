import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { obtenerLeaderboard } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/leaderboard', obtenerLeaderboard);

export default router;