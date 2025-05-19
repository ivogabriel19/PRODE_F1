import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import resultadosRoutes from './routes/resultadosRoutes.js';
import obtenerRoutes from './routes/obtenerRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/resultados', resultadosRoutes);
app.get('/resultados/:anio/:nombreCarrera', resultadosRoutes);
app.use("/api/carreras", obtenerRoutes);
/*app.get('/', (req, res) => {
    res.send('F1 Prode API funcionando');
});*/
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("🟢 Conectado a MongoDB"))
    .catch(err => console.error("🔴 Error al conectar MongoDB:", err));

export default app;