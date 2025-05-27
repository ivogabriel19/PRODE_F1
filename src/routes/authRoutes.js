import express from 'express'
import { register, login } from '../controllers/authController.js';
import { verificarJWT } from '../middlewares/authMiddleware.js';
import { loginView } from '../controllers/viewsController.js';

const router = express.Router();

router.post('/register', register);
router.get('/login', loginView);
router.post('/login', login);
router.get('/perfil', verificarJWT, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;