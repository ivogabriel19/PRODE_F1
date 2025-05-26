import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';

import {connectDB} from './config/db.js';
import {calcularPuntajePrediccion as calcularPuntaje} from "./utils/calcularPuntajePrediccion.js";

import userRoutes from './routes/userRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import resultadosRoutes from './routes/resultadosRoutes.js';
import obtenerRoutes from './routes/obtenerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import viewsRoutes from "./routes/viewsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configurar Handlebars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',             // Usa views/layouts/main.handlebars como layout base
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Rutas
app.use('/', viewsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/resultados', resultadosRoutes);
app.use('/api/obtener', obtenerRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use(express.static(path.join(__dirname, 'public')));

//mongo & mongoose sandbox routes
app.get('/user')

export default app;