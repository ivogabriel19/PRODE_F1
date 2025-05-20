import Prediction from '../models/prediction.js';
import { calcularPuntajePrediccion } from '../utils/calcularPuntajePrediccion.js';
import { obtenerResultadoCarrera } from '../services/obtenerResultadoCarrera.js'; // Asegúrate de tener esta función


export async function submitPrediction (req, res) {
  const { userId, raceId, predictions } = req.body;
  try {
    const newPrediction = new Prediction({ user: userId, raceId, predictions });
    await newPrediction.save();
    res.status(201).json(newPrediction);
  } catch (err) {
    res.status(400).json({ message: 'Error al guardar predicción', error: err });
  }
};

export async function procesarPrediction (req, res) {
  try {
    const { anio, carrera, pilotoP1, pilotoP2, pilotoP3 } = req.body;

    if (!anio || !carrera || !pilotoP1 || !pilotoP2 || !pilotoP3) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
    }

    // Obtener los resultados reales de la carrera
    const resultadoReal = await obtenerResultadoCarrera(carrera, anio);
    if (!resultadoReal || resultadoReal.length === 0) {
      return res.status(404).json({ error: 'No se encontraron resultados para la carrera especificada.' });
    }

    // Construir la predicción del usuario
    const prediccionUsuario = [pilotoP1, pilotoP2, pilotoP3];

    // Calcular el puntaje
    const puntaje = calcularPuntajePrediccion(prediccionUsuario, resultadoReal);

    res.json({ puntaje });
  } catch (error) {
    console.error('Error al procesar la predicción:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};