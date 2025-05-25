import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import {calcularPuntajePrediccion as calcularPuntaje} from "./utils/calcularPuntajePrediccion.js";

import userRoutes from './routes/userRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import resultadosRoutes from './routes/resultadosRoutes.js';
import obtenerRoutes from './routes/obtenerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/resultados', resultadosRoutes);
app.use('/api/obtener', obtenerRoutes);
app.use('/api/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use(express.static(path.join(__dirname, 'public')));

//mongo & mongoose sandbox routes
app.get('/user')

export default app;