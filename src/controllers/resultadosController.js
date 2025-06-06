// src/controllers/resultados.controller.js
import { calcularPuntajePrediccion as evaluarPrediccion } from '../utils/calcularPuntajePrediccion.js';
import { obtenerResultadoCarrera } from '../services/obtenerResultadoCarrera.js';
import { obtenerResultadoCompletoCarrera as serviceObtenerResultadoCompletoCarrera} from '../services/obtenerResultadoCompletoCarrera.js';
import { obtenerRoundPorNombre } from '../services/obtenerRoundPorNombre.js';

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

export async function obtenerResultadoCompletoCarrera(req, res) {
    try {
        const { anio, nombreCarrera } = req.params;
        //console.log('Lllego una consulta por la carrera:', nombreCarrera, 'del año ', anio);
        if (!anio || !nombreCarrera) {
            return res.status(400).json({ error: 'Faltan datos' });
        }
        const resultado = await serviceObtenerResultadoCompletoCarrera(nombreCarrera, anio);
        //console.log('Resultados obtenidos:', resultado);
        res.json({ resultado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}