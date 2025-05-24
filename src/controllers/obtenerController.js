//import fetch from 'node-fetch';
import { obtenerCarrerasPorAnio as obtenerCarreras } from '../services/obtenerCarrerasPorAnio.js';
import { obtenerConductoresPorAnio as obtenerConductores } from '../services/obtenerConductoresPorAnio.js';

export async function obtenerCarrerasPorAnio(req, res) {
    const { anio } = req.params;

    try {
        const carreras = await obtenerCarreras(anio);
        res.json({ carreras });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener las carreras: " + err.message });
    }
}

export async function obtenerConductoresPorAnio(req, res) {
    const { anio } = req.params;

    try {
        const conductores = await obtenerConductores(anio);
        res.json({ conductores });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los conductores: " + err.message });
    }
}