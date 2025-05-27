import express from 'express';
import {renderHome, renderAbout} from '../controllers/viewsController.js';
import { verificarJWT, verificarRol } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', renderHome);
router.get('/about', renderAbout);

export default router;