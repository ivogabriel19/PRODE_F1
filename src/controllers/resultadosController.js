// src/controllers/resultados.controller.js
import { calcularPuntajePrediccion as evaluarPrediccion } from '../utils/calcularPuntajePrediccion.js';
import { obtenerResultadoCarrera } from '../services/obtenerResultadoCarrera.js';
import { obtenerRoundPorNombre } from '../utils/obtenerRoundPorNombre.js';

export async function evaluarProde(req, res) {
    try {
        const { nombreCarrera, año, prediccion } = req.body;

        if (!nombreCarrera || !año || !Array.isArray(prediccion)) {
            return res.status(400).json({ error: 'Faltan datos o predicción no válida' });
        }

        const resultadoReal = await obtenerResultadoCarrera(nombreCarrera, año);
        const resultado = await evaluarPrediccion(prediccion, resultadoReal);

        //console.log('Resultado de la evaluación:', resultado);

        res.json({
            carrera: nombreCarrera,
            puntos: resultado,
            resultadoReal
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function obtenerResultadosCarrera(req, res) {
    try {
        const { anio, nombreCarrera } = req.params;
        const resultado = await obtenerResultadoCarrera(nombreCarrera, anio);
        res.json({ resultado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}