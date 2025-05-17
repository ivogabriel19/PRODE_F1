const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

const userRoutes = require('./src/routes/userRoutes');
const predictionRoutes = require('./src/routes/predictionRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.get('/', (req, res) => {
    res.send('F1 Prode API funcionando');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("🟢 Conectado a MongoDB"))
    .catch(err => console.error("🔴 Error al conectar MongoDB:", err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
