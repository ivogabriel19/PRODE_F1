import express from 'express'
import { register, login } from '../controllers/authController.js';
import { verificarJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verificarJWT, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;