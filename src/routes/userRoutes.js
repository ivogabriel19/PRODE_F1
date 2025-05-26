import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { obtenerLeaderboard } from '../controllers/userController.js';
import { getNotificaciones, checkNotificacion } from '../controllers/notificationController.js';
import { verificarJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/leaderboard', obtenerLeaderboard);
router.get('/notificaciones', verificarJWT, getNotificaciones);
router.post('/notificaciones/:id/leida', verificarJWT, checkNotificacion);

export default router;