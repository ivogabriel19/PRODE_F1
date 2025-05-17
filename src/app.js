import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import resultadosRoutes from './routes/resultadosRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/resultados', resultadosRoutes);
app.get('/', (req, res) => {
    res.send('F1 Prode API funcionando');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("🟢 Conectado a MongoDB"))
    .catch(err => console.error("🔴 Error al conectar MongoDB:", err));

export default app;