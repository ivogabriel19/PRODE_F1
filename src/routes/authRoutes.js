import express from 'express'
import { register, login } from '../controllers/authController.js';
import { protegerRuta } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', protegerRuta, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;