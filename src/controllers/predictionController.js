import Prediction from '../models/prediction.js';
import { calcularPuntajePrediccion } from '../utils/calcularPuntajePrediccion.js';
import { obtenerResultadoCarrera } from '../services/obtenerResultadoCarrera.js'; // Asegúrate de tener esta función

export async function submitPrediction(req, res) {
  const { userId, raceId, raceYear, predictions } = req.body;

  try {
    // Obtener resultados reales de la carrera desde la API
    const resultadosReales = await obtenerResultadosCarrera(raceYear, raceId);

    if (!resultadosReales) {
      return res.status(404).json({ message: "No se encontraron resultados para esa carrera." });
    }

    // Calcular puntaje
    const points = calcularPuntajePrediccion(predictions, resultadosReales);

    // Crear y guardar la predicción
    const newPrediction = new Prediction({
      user: userId,
      raceId,
      raceYear,
      predictions,
      points
    });

    await newPrediction.save();

    res.status(201).json(newPrediction);
  } catch (err) {
    console.error("Error al guardar predicción:", err);
    res.status(400).json({ message: "Error al guardar predicción", error: err });
  }
}

export async function procesarPrediction (req, res) { //endpoint para calcular un puntaje
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

